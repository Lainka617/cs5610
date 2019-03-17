import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.widgetId  = params['wgid'];
        }
    );

    this._widgetService.findWidgetById(this.widgetId).subscribe(
        (data: Widget) => {
          console.log(data);
          this.widget = data;
          if (this.widget) {
            this.youtubeName = this.widget ? this.widget.name : '';
            this.youtubeText = this.widget ? this.widget.text : '';
            this.youtubeUrl = this.widget ? this.widget.url : '';
            this.youtubeWidth = this.widget ? this.widget.width : '';
          }
        },
        (error: any) => {
          console.log(error);
        });
  }

  update () {
    if (this.widget) {
      this._widgetService.updateWidget(this.widget._id, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.youtubeName, this.widget.size, this.youtubeText, this.youtubeWidth, this.youtubeUrl)).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.youtubeName = this.widget ? this.widget.name : '';
              this.youtubeText = this.widget ? this.widget.text : '';
              this.youtubeUrl = this.widget ? this.widget.url : '';
              this.youtubeWidth = this.widget ? this.widget.width : '';
            }
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
          },
          (error: any) => {
            console.log(error);
          });
    } else {
      this._widgetService.createWidget(this.pageId, new Widget(this.websiteId, 'YOUTUBE', this.pageId, this.youtubeName, '', this.youtubeText, this.youtubeWidth, this.youtubeUrl)).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.youtubeName = this.widget ? this.widget.name : '';
              this.youtubeText = this.widget ? this.widget.text : '';
              this.youtubeUrl = this.widget ? this.widget.url : '';
              this.youtubeWidth = this.widget ? this.widget.width : '';
            }
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
          },
          (error: any) => {
            console.log(error);
          });
    }
  }

  delete () {
    this._widgetService.deleteWidget(this.widget._id).subscribe(
        (data: Widget) => {
          console.log(data);
          this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
        },
        (error: any) => {
          console.log(error);
        });
  }
}
