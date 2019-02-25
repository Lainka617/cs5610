import { Component, OnInit } from '@angular/core';
import { Widget } from '../../../../models/widget.model.client';
import { WidgetService } from '../../../../services/widget.service.client';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-heading',
  templateUrl: './widget-heading.component.html',
  styleUrls: ['./widget-heading.component.css']
})
export class WidgetHeadingComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: Widget;
  headingText: string;
  headingSize: string;
  headingName: string;

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.widgetId = params['wgid'];
         // this.widget = this._widgetService.findWidgetById(params['wgid']);
        }
    );
    this.widget = this._widgetService.findWidgetById(this.widgetId);
    // this.widgets = this._widgetService.findWidgetByPageId(this.pageId);
      if (this.widget) {
          this.headingText = this.widget.text;
          this.headingSize = this.widget.size;
          this.headingName =  this.widget.name;
      }
  }

    update () {
        let widgetTest;
        if (this.widget) {
            this._widgetService.updateWidget(this.widgetId, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.headingName, this.headingSize, this.headingText, this.widget.url, this.widget.width));
            widgetTest = this._widgetService.findWidgetById(this.widget._id);
        } else {
            widgetTest = this._widgetService.createWidget(this.pageId, new Widget(this.widgetId, 'HEADING', this.pageId, this.headingName, this.headingSize, this.headingText, '', ''));
        }
        console.log(widgetTest.text);
        console.log(widgetTest.size);
    }

    delete () {
        this._widgetService.deleteWidget(this.widget._id);
    }

}
