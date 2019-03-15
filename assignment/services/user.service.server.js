'use strict';

const common = require('../common');

module.exports = function (app) {

    var users = [
        {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder', email: 'alice@123.com' },
        {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@123.com' },
        {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@123.com' },
        {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@123.com' }
    ];

    //user api list
    app.get("/api/user/:userId", findUserById);
    app.get('/api/user', findUserByCredOrName);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUserById);


    //function list
    function findUserById(req, res) {

        console.log("hit find user by id...");

        var id = req.params.userId;

        for (var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                console.log(users);
                return;
            }
        }

        res.status(404).send('Sorry, we cannot find that!');
    }

    function findUserByCredOrName(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCred(req, res);
        }
        else{
            findUserByUsername(req, res);
        }
    }

    function findUserByCred(req, res){
        var username = req.query["username"];
        var password = req.query["password"];
        console.log("by cred");

        for (var i in users){
            if(users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function findUserByUsername(req, res) {
        var name = req.query["username"];

        console.log('by name');
        for (var i in users){
            if(users[i].username === name){
                res.send(users[i]);
                return;
            }
        }

        res.status(404).send('Sorry, we cannot find that!');
    }

    function createUser(req, res) {
        var newUser = {
            _id: common.getRandomId(1000),
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }

        users.push(newUser);

        res.send(newUser);
    }

    function updateUser(req, res) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === req.params.userId) {
                users[i].firstName = req.body.firstName;
                users[i].lastName = req.body.lastName;
                users[i].email = req.body.email;
                users[i].username = req.body.username;
                res.send(users[i]);
                console.log(users);
                return;
            }
        }


        res.status(404).send("not found!");
    }

    function deleteUserById(req, res) {
        for (const i in users) {
            if (users[i]._id === req.params.userId) {
                const j = +i;
                users.splice(j, 1);
                res.send("Delete succeed!");
                console.log(users);
                return;
            }
        }

        res.status(404).send("not found!");
    }
}




