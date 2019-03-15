'use strict';

const getRandomId = require('../common');

module.exports = function (app) {

    //widget related api
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetByPageId); // change the name"findAllWidgetsForPage" to "findWidgetByWidgetId" to make it more clear
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget)
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
        const new_widget = {
            _id: getRandomId(1000),
            name: req.body.name,
            pageId: req.params.pageId,
            description: req.body.description
        };
        widgets.push(widget);
        res.send(widget);;
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
        res.send(
            widgets.find(
                function (widget) {
                    return widget._id === req.params.widgetId;
                }
            )
        );
        res.status(404).send("not found!");
    }

    function updateWidget(req, res) {
        for (const i in widgets) {
            if (widgets[i]._id === req.params.widgetId) {
                switch (widget.widgetType) {
                    case 'HEADING':
                        widgets[i].name = req.params.name;
                        widgets[i].text = req.params.text;
                        widgets[i].size = req.params.size;
                        res.send(widgets[i]);
                        return;

                    case 'IMAGE':
                        widgets[i].name = req.params.name;
                        widgets[i].text = req.params.text;
                        widgets[i].url = req.params.url;
                        widgets[i].width = req.params.width;
                        res.send(widgets[i]);
                        return;

                    case 'YOUTUBE':
                        widgets[i].name = req.params.name;
                        widgets[i].text = req.params.text;
                        widgets[i].url = req.params.url;
                        widgets[i].width = req.params.width;
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
                widgets.splice(j, 1);
                res.send("Delete succeed!");
                return;
            }
        }
        res.status(404).send("not found!");
        }



}
