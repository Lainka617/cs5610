import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';

@Injectable()
export  class WidgetService {

    constructor() {
    }

    widgets = [
        {'_id': '123', 'widgetType': 'HEADDING', 'pageId': '321', 'size': '2', 'text': 'GIZMODO'},
        {'_id': '234', 'widgetType': 'HEADDING', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '345',
            'widgetType': 'IMAGE',
            'pageId': '321',
            'width': '100%',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
        {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '678',
            'widgetType': 'YOUTUBE',
            'pageId': '321',
            'width': '100%',
            'url': 'https://youtu.be/AM2Ivdi9c4E'
        },
        {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
    ];

    api = {
        'createWidget': this.createWidget,
        'findWidgetByPageId': this.findWidgetByPageId,
        'findWidgetById': this.findWidgetById,
        'updateWidget': this.updateWidget,
        'deldeteWidget': this.deleteWidget
    };

    createWidget(pageId, widget) {
        this.widgets.push(widget);
    }

    findWidgetByPageId(pageId) {
        return this.widgets.filter(function (widget) {
            return widget.pageId === pageId;
        });
    }

    findWidgetById(widgetId) {
        return this.widgets.find(function (widget) {
            return widget._id === widgetId;
        });
    }

    updateWidget(widgetId, widget) {
        for (const i in this.widgets) {
            if (this.widgets[i]._id === widgetId) {
                switch (widget.widgetType) {
                    case 'HEADER':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].size = widget.size;
                        return true;

                    case 'IMAGE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return true;

                    case 'YOUTUBE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return true;
                }

            }
        }
        return false;
    }

    deleteWidget(widgetId) {
        for (const i in this.widgets) {
            if (this.widgets[i]._id === widgetId) {
                const j = +i;
                this.widgets.splice(j, 1);
            }
        }
    }
}
