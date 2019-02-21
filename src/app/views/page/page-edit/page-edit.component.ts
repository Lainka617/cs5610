import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  websiteId: string;
  userId: string;
  pageId: string;
  page: Page;

  constructor(private _pageService: PageService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
    );
    this.page = this._pageService.findPageById(this.pageId);
  }

  update () {
    this._pageService.updatePage(this.pageId, this.page);
  }

  delete () {
    this._pageService.deletePage(this.pageId);
  }
}
