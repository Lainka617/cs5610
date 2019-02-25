import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: Widget;
  youtubeName: string;
  youtubeText: string;
  youtubeUrl: string;
  youtubeWidth: string;

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.widgetId  = params['wgid'];
        }
    );

    this.widget = this._widgetService.findWidgetById(this.widgetId);
    if (this.widget) {
      this.youtubeName = this.widget ? this.widget.name : '';
      this.youtubeText = this.widget ? this.widget.text : '';
      this.youtubeUrl = this.widget ? this.widget.url : '';
      this.youtubeWidth = this.widget ? this.widget.width : '';
    }
  }

  update () {
    let widgetTest;
    if (this.widget) {
      this._widgetService.updateWidget(this.widget._id, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.youtubeName, this.widget.size, this.youtubeText, this.youtubeWidth, this.youtubeUrl));
      widgetTest = this._widgetService.findWidgetById(this.widget._id);
    } else {
      widgetTest = this._widgetService.createWidget(this.pageId, new Widget(this.websiteId, 'YOUTUBE', this.pageId, this.youtubeName, '', this.youtubeText, this.youtubeWidth, this.youtubeUrl));
    }
    console.log(widgetTest.text);
    console.log(widgetTest.url);
    console.log(widgetTest.width);
  }

  delete () {
    this._widgetService.deleteWidget(this.widget._id);
  }
}
