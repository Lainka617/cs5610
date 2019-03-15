'use strict';

const getRandomId = require('../common');

module.exports = function (app) {

    //page related api
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId); // change the name"findAllPagesForUser" to "findPageByWebsiteId" to make it more clear
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage)
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        {_id: '321', name: 'Post1', websiteId: '123', description: 'Lorem1'},
        {_id: '432', name: 'Post2', websiteId: '123', description: 'Lorem2'},
        {_id: '543', name: 'Post3', websiteId: '234', description: 'Lorem3'},
        {_id: '654', name: 'Post4', websiteId: '234', description: 'Lorem4'},
        {_id: '765', name: 'Post5', websiteId: '890', description: 'Lorem5'},
        {_id: '876', name: 'Post6', websiteId: '890', description: 'Lorem6'},
        {_id: '987', name: 'Post7', websiteId: '456', description: 'Lorem7'},
        {_id: '123', name: 'Post8', websiteId: '456', description: 'Lorem8'},
        {_id: '234', name: 'Post9', websiteId: '567', description: 'Lorem9'},
        {_id: '345', name: 'Post10', websiteId: '567', description: 'Lorem10'},
        {_id: '456', name: 'Post11', websiteId: '678', description: 'Lorem11'},
        {_id: '567', name: 'Post12', websiteId: '678', description: 'Lorem12'},
        {_id: '678', name: 'Post13', websiteId: '671', description: 'Lorem13'},
        {_id: '789', name: 'Pos14', websiteId: '671', description: 'Lorem14'},
        {_id: '890', name: 'Post15', websiteId: '789', description: 'Lorem15'},
        {_id: '901', name: 'Post16', websiteId: '789', description: 'Lorem16'}
    ];

    function createPage(req, res) {

        const new_page = {
            _id: getRandomId(1000),
            name: req.body.name,
            websiteId: req.params.websiteId,
            description: req.body.description
        };

        pages.push(new_page);
        res.send(new_page);
    }

    function findPageByWebsiteId(req, res) {
        const resultSet = [];
        for (const i in pages) {
            if (pages[i].websiteId === req.params.websiteId) {
                resultSet.push(pages[i]);
            }
        }
        res.send(resultSet);
        return;
        res.status(404).send("not found!");
    }

    function findPageById(req, res) {
        res.send(
            pages.find(
                function (page) {
                    return page._id === req.params.pageId;
                }
            )
        );
        res.status(404).send("not found!");
    }

    function updatePage(req, res) {
        for (const i in pages) {
            if (pages[i]._id === req.params.pageId) {
                pages[i].name = req.params.name;
                pages[i].description = req.params.description;
                res.send(pages[i]);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function deletePage(req, res) {
        for (const i in pages) {
            if (pages[i]._id === req.params.pageId) {
                const j = +i;
                pages.splice(j, 1);
                res.send("Delete succeed!");
                return;
            }
        }
        res.status(404).send("not found!");
    }
}
