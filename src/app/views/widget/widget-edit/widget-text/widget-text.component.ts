import { Component, OnInit } from '@angular/core';
import {getRandomId} from '../../../../common';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: Widget;
  textText: string;
  textName: string;
  textRows: number;
  textPlaceholder: string;
  textFormatted: boolean;

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.widgetId = params['wgid'];
        }
    );
    this._widgetService.findWidgetById(this.widgetId).subscribe(
        (data: Widget) => {
          console.log(data);
          this.widget = data;
          if (this.widget) {
            this.textName = this.widget.name;
            this.textRows =  this.widget.rows;
            this.textText = this.widget.text;
            this.textPlaceholder = this.widget.placeholder;
            this.textFormatted = this.widget.formatted;
          }
        },
        (error: any) => {
          console.log(error);
        });
  }

  update () {
    if (this.widget) {
      this._widgetService.updateWidget(this.widgetId, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.textName, this.widget.size, this.textText, this.widget.url, this.widget.width, this.textPlaceholder, this.textRows, this.textFormatted)).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.textName = this.widget.name;
              this.textRows =  this.widget.rows;
              this.textText = this.widget.text;
              this.textPlaceholder = this.widget.placeholder;
              this.textFormatted = this.widget.formatted;
            }
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
          },
          (error: any) => {
            console.log(error);
          });
    } else {
      this._widgetService.createWidget(this.pageId, new Widget(getRandomId(1000), 'INPUT', this.pageId, this.textName, '', this.textText, '', '', this.textPlaceholder, this.textRows, this.textFormatted)).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.textName = this.widget.name;
              this.textRows =  this.widget.rows;
              this.textText = this.widget.text;
              this.textPlaceholder = this.widget.placeholder;
              this.textFormatted = this.widget.formatted;
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
