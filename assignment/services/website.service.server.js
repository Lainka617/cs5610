'use strict';

const getRandomId = require('../common');

module.exports = function (app) {

    //website related api
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser); // change the name"findAllWebsitesForUser" to "findWebsitesByUser" to make it more clear
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite)
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        {'_id': '123', 'name': 'Facebook', 'developerId': '123', 'description': 'Lorem1' },
        {'_id': '234', 'name': 'Twittter', 'developerId': '456', 'description': 'Lorem2' },
        {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem3' },
        {'_id': '890', 'name': 'Microsoft', 'developerId': '234', 'description': 'Lorem4' },
        {'_id': '567', 'name': 'Google', 'developerId': '123', 'description': 'Lorem5' },
        {'_id': '678', 'name': 'Uber', 'developerId': '234', 'description': 'Lorem6' },
        {'_id': '671', 'name': 'Lyft', 'developerId': '345', 'description': 'Lorem7' },
        {'_id': '789', 'name': 'Zillow', 'developerId': '345', 'description': 'Lorem8' }
    ]

    function createWebsite(req, res) {

        const new_website = {
            _id: getRandomId(1000),
            name: req.body.name,
            developerId: req.params.developerId,
            description: req.body.description
        };

        websites.push(new_website);
        res.send(new_website);
    }
    function findWebsitesByUser(req, res) {
        const resultSet = [];
        for (const i in websites) {
            if (websites[i].developerId === req.params.userId) {
                resultSet.push(websites[i]);
            }
        }
        res.send(resultSet);
        return;
        res.status(404).send("not found!");
    }

    function findWebsiteById(req, res) {
        var id = req.params.userId;

        for (var i in websites){
            if(websites[i].developerId=== id){
                res.send(websites[i]);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function updateWebsite(req, res) {
        for (const i in websites) {
            if (websites[i]._id === req.params.websiteId) {
                websites[i].name = req.params.name;
                websites[i].description = req.params.description;
                res.send(websites[i]);
            }
        }
        res.status(404).send("not found!");
    }

    function deleteWebsite(req, res) {
        for (const i in websites) {
            if (websites[i]._id === req.params.websiteId) {
                const j = +i;
                websites.splice(j, 1);
                res.send("Delete succeed");
                return;
            }
        }
        res.status(404).send("not found!");
    }

}


