import { Component, OnInit } from '@angular/core';
import { Widget } from '../../../../models/widget.model.client';
import { WidgetService } from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {getRandomId} from '../../../../common';

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

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private router: Router) { }

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
    this._widgetService.findWidgetById(this.widgetId).subscribe(
        (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
                this.headingText = this.widget.text;
                this.headingSize = this.widget.size;
                this.headingName =  this.widget.name;
            }
        },
        (error: any) => {
            console.log(error);
        });
  }

    update () {
        if (this.widget) {
            this._widgetService.updateWidget(this.widgetId, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.headingName, this.headingSize, this.headingText, this.widget.url, this.widget.width)).subscribe(
                (data: Widget) => {
                    console.log(data);
                    this.widget = data;
                    if (this.widget) {
                        this.headingText = this.widget.text;
                        this.headingSize = this.widget.size;
                        this.headingName =  this.widget.name;
                    }
                    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
                },
                (error: any) => {
                    console.log(error);
                });
        } else {
            this._widgetService.createWidget(this.pageId, new Widget(getRandomId(1000), 'HEADING', this.pageId, this.headingName, this.headingSize, this.headingText, '', '')).subscribe(
                (data: Widget) => {
                    console.log(data);
                    this.widget = data;
                    if (this.widget) {
                        this.headingText = this.widget.text;
                        this.headingSize = this.widget.size;
                        this.headingName =  this.widget.name;
                    }
                    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
                },
                (error: any) => {
                    console.log(error);
                });;
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
