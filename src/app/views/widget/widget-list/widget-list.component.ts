import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service.client';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})

export class WidgetListComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    widgets: Widget[] = [];
    widgetsII: Widget[] = [];

    constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe(
            (params: any) => {
              this.pageId = params['pid'];
              this.userId = params['uid'];
              this.websiteId = params['wid'];
            }
        );

        let temp: Widget[];
        this.widgets = [];
        this._widgetService.findWidgetByPageId(this.pageId).subscribe(
            (data: Widget[]) => {
                console.log(data);
                if (data != null) {
                    temp = data;
                    temp.forEach(widget => {
                        this.widgets.push(new Widget(widget._id, widget.widgetType, widget.pageId, widget.name, widget.size, widget.text, widget.width, widget.url, widget.placeholder, widget.rows, widget.formatted));
                        this.widgetsII.push(new Widget(widget._id, widget.widgetType, widget.pageId, widget.name, widget.size, widget.text, widget.width, widget.url, widget.placeholder, widget.rows, widget.formatted));
                        console.log(this.widgets[this.widgets.length - 1].text);
                        if (widget.url) {
                            try {
                                this.widgets[this.widgets.length - 1].url = this.sanitizer.bypassSecurityTrustResourceUrl(widget.url);
                            } catch (e) {
                                console.log(e.toString());
                            }
                        }
                    });
                }
            },
            (error: any) => {
                console.log(error);
            });
    }

    reorderItems(indexes) {
        const tempII: Widget = this.widgetsII[indexes.startIndex];
        this.widgetsII.splice(indexes.startIndex, 1);
        this.widgetsII.splice(indexes.endIndex, 0, tempII);

        const temp: Widget = this.widgets[indexes.startIndex];
        this.widgets.splice(indexes.startIndex, 1);
        this.widgets.splice(indexes.endIndex, 0, temp);

        this._widgetService.reorderWidgets(this.pageId, indexes.startIndex, indexes.endIndex, this.widgetsII).subscribe(
            (data: Widget[]) => {
                this.widgetsII = data;
            },
            (error: any) => {
                console.log(error);
            }
        );
    }
}
