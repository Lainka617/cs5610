'use strict';

const common = require('../common');

module.exports = function (app) {

    //widget related api
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetByPageId); // change the name"findAllWidgetsForPage" to "findWidgetByWidgetId" to make it more clear
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        {'_id': '321', 'widgetType': 'HEADING', 'pageId': '321', 'name': 'This is a header', 'size': '2', 'text': 'GIZMODO'},
        {'_id': '432', 'widgetType': 'HEADING', 'pageId': '432', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '543',
            'widgetType': 'IMAGE',
            'pageId': '543',
            'name': 'This is an image',
            'width': '100%',
            'text': 'Text',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '654', 'widgetType': 'HEADING', 'pageId': '654', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '765',
            'widgetType': 'YOUTUBE',
            'pageId': '765',
            'name': 'This is a video',
            'width': '100%',
            'text': 'Text',
            'url': 'https://www.youtube.com/embed/APexI9Zb6iE'
        },
        {'_id': '876', 'widgetType': 'HEADING', 'pageId': '876', 'name': 'This is a header', 'size': '2', 'text': 'GIZMODO'},
        {'_id': '987', 'widgetType': 'HEADING', 'pageId': '987', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '123',
            'widgetType': 'IMAGE',
            'pageId': '123',
            'name': 'This is am image',
            'width': '100%',
            'text': 'Text',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '234', 'widgetType': 'HEADING', 'pageId': '234', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '345',
            'widgetType': 'YOUTUBE',
            'pageId': '345',
            'name': 'This is a video',
            'width': '100%',
            'text': 'Text',
            'url': 'https://www.youtube.com/embed/APexI9Zb6iE'
        },
        {'_id': '456', 'widgetType': 'HEADING', 'pageId': '456', 'name': 'This is a header', 'size': '2', 'text': 'GIZMODO'},
        {'_id': '567', 'widgetType': 'HEADING', 'pageId': '567', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '678',
            'widgetType': 'IMAGE',
            'pageId': '678',
            'name': 'This is an image',
            'width': '100%',
            'text': 'Text',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '789', 'widgetType': 'HEADING', 'pageId': '789', 'name': 'This is a header', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '890',
            'widgetType': 'YOUTUBE',
            'pageId': '890',
            'name': 'This is a video',
            'width': '100%',
            'text': 'Text',
            'url': 'https://www.youtube.com/embed/APexI9Zb6iE'
        },
        {
            '_id': '901',
            'widgetType': 'YOUTUBE',
            'pageId': '901',
            'name': 'This is a video',
            'width': '100%',
            'text': 'Text',
            'url': 'https://www.youtube.com/embed/APexI9Zb6iE'
        }
    ];

    //function list
    function createWidget(req, res) {
        console.log(req.body);
        var new_widget;
        switch (req.body.widgetType) {
            case 'HEADING':
                new_widget = {
                    _id: req.body._id,
                    widgetType: req.body.widgetType,
                    pageId: req.body.pageId,
                    name: req.body.name,
                    text: req.body.text,
                    size: req.body.size
                };
                break;
            case 'IMAGE':
                new_widget = {
                    _id: req.body._id,
                    widgetType: req.body.widgetType,
                    pageId: req.body.pageId,
                    name: req.body.name,
                    text: req.body.text,
                    url: req.body.url,
                    width: req.body.width
                };
                break;
            case 'YOUTUBE':
                new_widget = {
                    _id: req.body._id,
                    widgetType: req.body.widgetType,
                    pageId: req.body.pageId,
                    name: req.body.name,
                    text: req.body.text,
                    url: req.body.url,
                    width: req.body.width
                };
                break;
        }
        console.log(new_widget);
        widgets.push(new_widget);
        res.send(new_widget);
    }

    function findWidgetByPageId(req, res) {
        const resultSet = [];
        for (const i in widgets) {
            if (widgets[i].pageId === req.params.pageId) {
                resultSet.push(widgets[i]);
            }
        }
        res.send(resultSet);
        return;
        res.status(404).send("not found!");
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;

        for (var i in widgets){
            if(widgets[i]._id=== id){
                res.send(widgets[i]);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function updateWidget(req, res) {
        for (const i in widgets) {
            if (widgets[i]._id === req.params.widgetId) {
                switch (widgets[i].widgetType) {
                    case 'HEADING':
                        widgets[i].name = req.body.name;
                        widgets[i].text = req.body.text;
                        widgets[i].size = req.body.size;
                        res.send(widgets[i]);
                        return;

                    case 'IMAGE':
                        widgets[i].name = req.body.name;
                        widgets[i].text = req.body.text;
                        widgets[i].url = req.body.url;
                        widgets[i].width = req.body.width;
                        res.send(widgets[i]);
                        return;

                    case 'YOUTUBE':
                        widgets[i].name = req.body.name;
                        widgets[i].text = req.body.text;
                        widgets[i].url = req.body.url;
                        widgets[i].width = req.body.width;
                        res.send(widgets[i]);
                        return;
                }
            }
        }
        res.status(404).send("not found!");
    }

    function deleteWidget(req, res) {
        for (const i in widgets) {
            if (widgets[i]._id === req.params.widgetId) {
                const j = +i;
                var temp = widgets[i];
                widgets.splice(j, 1);
                res.send(temp);
                return;
            }
        }
        res.status(404).send("not found!");
    }
}
