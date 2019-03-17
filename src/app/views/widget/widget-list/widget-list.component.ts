import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { WidgetService } from '../../../services/widget.service.client';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../../models/widget.model.client';
import {DomSanitizer} from '@angular/platform-browser';
import {Page} from "../../../models/page.model.client";

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
            temp = data;
            temp.forEach( widget => {
                this.widgets.push(new Widget(widget._id, widget.widgetType, widget.pageId, widget.name, widget.size, widget.text, widget.width, widget.url));
                console.log(this.widgets[this.widgets.length - 1].text);
                if (widget.url) {
                    try {
                        this.widgets[this.widgets.length - 1].url = this.sanitizer.bypassSecurityTrustResourceUrl(widget.url);
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
            });
        },
        (error: any) => {
            console.log(error);
        });
  }
}
