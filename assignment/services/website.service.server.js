'use strict';

const websiteModel = require('../model/website/website.model.server');

module.exports = function (app) {

    //website related api
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser); // change the name"findAllWebsitesForUser" to "findWebsitesByUser" to make it more clear
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        const new_website = {
            name: req.body.name,
            developerId: req.body.developerId,
            description: req.body.description,
            pages: []
        };

        websiteModel
            .createWebsite(new_website.developerId, new_website)
            .then(function (website){
                res.status(200).send(website);
            }, function(error){
                console.log(error);
                res.status(400).send(error);
            });
    }

    function findWebsitesByUser(req, res) {
        websiteModel.findWebsitesByUser(req.params.userId).then(
            websites => {
                console.log(websites);
                if(websites == null || websites.length == 0) {
                    res.status(404).send('not found!');
                }
                else {
                    res.send(websites);
                }
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function findWebsiteById(req, res) {
        websiteModel.findWebsiteById(req.params.websiteId).then(
            website => {
                if(website == null) {
                    res.sendStatus(404).send('not found!');
                }
                else {
                    res.send(website);
                }
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function updateWebsite(req, res) {
        websiteModel.updateWebsite(req.params.websiteId, {
            name: req.body.name,
            description: req.body.description
        }).then(website => {
            res.send(website);
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });

    }

    function deleteWebsite(req, res) {
        websiteModel.deleteWebsite(req.params.websiteId).then(data => {
            res.send({message: "delete successful"});
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

}


