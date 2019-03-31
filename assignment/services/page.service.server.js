'use strict';

const pageModel = require('../model/page/page.model.server');

module.exports = function (app) {

    //page related api
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId); // change the name"findAllPagesForUser" to "findPageByWebsiteId" to make it more clear
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage)
    app.delete("/api/page/:pageId", deletePage);

    // var pages = [
    //     {_id: '321', name: 'Post1', websiteId: '123', description: 'Lorem1'},
    //     {_id: '432', name: 'Post2', websiteId: '123', description: 'Lorem2'},
    //     {_id: '543', name: 'Post3', websiteId: '234', description: 'Lorem3'},
    //     {_id: '654', name: 'Post4', websiteId: '234', description: 'Lorem4'},
    //     {_id: '765', name: 'Post5', websiteId: '890', description: 'Lorem5'},
    //     {_id: '876', name: 'Post6', websiteId: '890', description: 'Lorem6'},
    //     {_id: '987', name: 'Post7', websiteId: '456', description: 'Lorem7'},
    //     {_id: '123', name: 'Post8', websiteId: '456', description: 'Lorem8'},
    //     {_id: '234', name: 'Post9', websiteId: '567', description: 'Lorem9'},
    //     {_id: '345', name: 'Post10', websiteId: '567', description: 'Lorem10'},
    //     {_id: '456', name: 'Post11', websiteId: '678', description: 'Lorem11'},
    //     {_id: '567', name: 'Post12', websiteId: '678', description: 'Lorem12'},
    //     {_id: '678', name: 'Post13', websiteId: '671', description: 'Lorem13'},
    //     {_id: '789', name: 'Pos14', websiteId: '671', description: 'Lorem14'},
    //     {_id: '890', name: 'Post15', websiteId: '789', description: 'Lorem15'},
    //     {_id: '901', name: 'Post16', websiteId: '789', description: 'Lorem16'}
    // ];

    function createPage(req, res) {
        const new_page = {
            name: req.body.name,
            websiteId: req.params.websiteId,
            description: req.body.description
        };

        pageModel
            .createPage(new_page.websiteId, new_page)
            .then(
                pages => {
                    console.log(pages);
                    if(pages == null || pages.length == 0) {
                        res.status(404).send('not found!');
                    }
                    else {
                        res.send(pages);
                    }
                }, error => {
                    console.log(error);
                    res.status(400).send(error);
                }
            );
    }

    function findPageByWebsiteId(req, res) {
        pageModel.findPagesByWebsiteId(req.params.websiteId).then(
            pages => {
                console.log(pages);
                if(pages == null || pages.length == 0) {
                    res.status(404).send('not found!');
                }
                else {
                    res.send(pages);
                }
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function findPageById(req, res) {
        pageModel.findPageById(req.params.pageId).then(
            page => {
                console.log(page);
                if(page == null) {
                    res.status(404).send('not found!');
                }
                else {
                    res.send(page);
                }
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function updatePage(req, res) {
        pageModel.updatePage(req.params.pageId, {
            name: req.body.name,
            description: req.body.description
        }).then(
            page => {
                console.log(page);
                if(page == null) {
                    res.status(404).send('not found!');
                }
                else {
                    res.send(page);
                }
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }

    function deletePage(req, res) {
        pageModel.deletePage(req.params.pageId).then(
            data => {
                res.send({message: "delete successful"});
            }, error => {
                console.log(error);
                res.status(400).send(error);
            });
    }
}
