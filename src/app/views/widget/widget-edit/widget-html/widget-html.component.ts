import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {getRandomId} from '../../../../common';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget: Widget;
  htmlText: string;
  htmlName: string;

  public editor;
  public editorContent = '';
  public editorOptions = {
    placeholder: 'insert content...'
  };

  constructor(private _widgetService: WidgetService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    this.htmlText = html;
    console.log('quill content is changed!', quill, html, text);
  }

  ngOnInit() {
    setTimeout(() => {
      this.editorContent = '<h1>content changed!</h1>';
      console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800);
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
            this.htmlText = this.widget.text;
            this.htmlName =  this.widget.name;
          }
        },
        (error: any) => {
          console.log(error);
        });
  }

  update () {
    if (this.widget) {
      this._widgetService.updateWidget(this.widgetId, new Widget(this.widgetId, this.widget.widgetType, this.widget.pageId, this.htmlName, this.widget.size, this.htmlText, this.widget.url, this.widget.width)).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.htmlText = this.widget.text;
              this.htmlName =  this.widget.name;
            }
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
          },
          (error: any) => {
            console.log(error);
          });
    } else {
      this._widgetService.createWidget(this.pageId, new Widget(getRandomId(1000), 'HTML', this.pageId, this.htmlName, '', this.htmlText, '', '')).subscribe(
          (data: Widget) => {
            console.log(data);
            this.widget = data;
            if (this.widget) {
              this.htmlText = this.widget.text;
              this.htmlName =  this.widget.name;
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
