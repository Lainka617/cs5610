'use strict';

const userModel = require('../model/user/user.model.server');

module.exports = function (app) {
    // var users = [
    //     {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder', email: 'alice@123.com' },
    //     {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', email: 'bob@123.com' },
    //     {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia', email: 'charly@123.com' },
    //     {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi', email: 'jannunzi@123.com' }
    // ];

    //user api list
    app.get("/api/user/:userId", findUserById);
    app.get('/api/user', findUserByCredOrName);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUserById);

    //function list
    function findUserById(req, res) {
        var id = req.params.userId;

        userModel.findUserById(id).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
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

        userModel.findUserByCredentials(username, password).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    function findUserByUsername(req, res) {
        var name = req.query["username"];

        userModel.findUserByUserName(name).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    //teacher in class demo to us
    function createUser(req, res) {
        var newUser = req.body;
        newUser.websites = [];
        console.log(newUser);
        userModel
            .createUser(newUser)
            .then(function (user){
                res.status(200).send(user);
            }, function(error){
                console.log(error);
                res.status(400).send(error);
            });
    }

    function updateUser(req, res) {
        userModel.updateUser(req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username
        }).then(user => {
            res.send(user);
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    function deleteUserById(req, res) {
        userModel.deleteUser(req.params.userId).then(data => {
            res.send({message: "delete successful"});
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }
}




