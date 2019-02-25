import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
// import { faUser, faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

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
  pageName: string;
  pageDescription: string;

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

    this.pageName = this.page.name;
    this.pageDescription = this.page.description;
  }

  update () {
    this._pageService.updatePage(this.pageId, new Page(this.page._id, this.pageName, this.page.websiteId, this.pageDescription));
    let pageTest = this._pageService.findPageById(this.pageId);
    console.log(pageTest.name);
    console.log(pageTest.description);
  }

  delete () {
    this._pageService.deletePage(this.pageId);
  }
}
