import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Page} from "../models/page.model.client";

@Injectable()
export  class WidgetService {

    constructor(private http: HttpClient) {
    }

    widgets: Widget[] = [
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

    api = {
        'createWidget': this.createWidget,
        'findWidgetByPageId': this.findWidgetByPageId,
        'findWidgetById': this.findWidgetById,
        'updateWidget': this.updateWidget,
        'deldeteWidget': this.deleteWidget
    };

    createWidget(pageId, widget) {
        return this.http.post(environment.baseUrl + '/api/page/' + pageId + '/widget', widget);
    }

    findWidgetByPageId(pageId) {
        return this.http.get( environment.baseUrl + '/api/page/' + pageId + '/widget');
    }

    findWidgetById(widgetId) {
        return this.http.get( environment.baseUrl + '/api/widget/' + widgetId);
    }

    updateWidget(widgetId, widget) {
        let body;

        switch (widget.widgetType) {
            case 'HEADING':
                body = {
                    _id: widget._id,
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    name: widget.name,
                    text: widget.text,
                    size: widget.size
                };
                break;
            case 'IMAGE':
                body = {
                    _id: widget._id,
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                };
                break;
            case 'YOUTUBE':
                body = {
                    _id: widget._id,
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width
                };
                break;
        }
        return this.http.put(
            environment.baseUrl + '/api/widget/' + widgetId, body);
    }

    deleteWidget(widgetId) {
        return this.http.delete(environment.baseUrl + '/api/widget/' + widgetId);
    }
}
