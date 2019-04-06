import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export  class WidgetService {

    constructor(private http: HttpClient) {
    }

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
            case 'HTML':
                body = {
                    _id: widget._id,
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    name: widget.name,
                    text: widget.text,
                };
                break;
            case 'INPUT':
                body = {
                    _id: widget._id,
                    widgetType: widget.widgetType,
                    pageId: widget.pageId,
                    name: widget.name,
                    text: widget.text,
                    rows: widget.rows,
                    placeholder: widget.placeholder,
                    formatted: widget.formatted
                };
                break;
        }
        return this.http.put(
            environment.baseUrl + '/api/widget/' + widgetId, body);
    }

    deleteWidget(widgetId) {
        return this.http.delete(environment.baseUrl + '/api/widget/' + widgetId);
    }

    reorderWidgets(pageId, index1, index2, widgets) {
        return this.http.put(environment.baseUrl + '/api/page/' + pageId + '/widget?initial=' + index1 + '&final=' + index2, widgets);
    }
}
