import { Component, OnInit } from '@angular/core';
import { Widget } from '../../../../models/widget.model.client';
import { WidgetService } from '../../../../services/widget.service.client';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: Widget;
  imageName: string;
  imageText: string;
  imageUrl: string;
  imageWidth: string;

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.widgetId = params['wgid'];
        }
    );
    this.widget = this._widgetService.findWidgetById(this.widgetId);
    if(this.widget) {
      this.imageName = this.widget.name;
      this.imageText = this.widget.text;
      this.imageUrl = this.widget.url;
      this.imageWidth = this.widget.width;
    }
  }
  update () {
    let widgetTest;
    if (this.widget) {
      this._widgetService.updateWidget(this.widgetId, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.imageName, this.widget.size, this.imageText, this.imageWidth, this.imageUrl));
      widgetTest = this._widgetService.findWidgetById(this.widget._id);
    } else {
      widgetTest = this._widgetService.createWidget(this.pageId, new Widget(this.widgetId, 'IMAGE', this.pageId, this.imageName, '', this.imageText, this.imageWidth, this.imageUrl))
    }
    console.log(widgetTest.text);
    console.log(widgetTest.size);
  }

  delete () {
    this._widgetService.deleteWidget(this.widget._id);
  }
}
