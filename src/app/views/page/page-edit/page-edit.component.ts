import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private _pageService: PageService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
    );
    this._pageService.findPageById(this.pageId).subscribe(
        (data: Page) => {
          console.log(data);
          this.page = data;
          this.pageName = this.page.name;
          this.pageDescription = this.page.description;
        },
        (error: any) => {
          console.log(error);
        });
  }

  update () {
    this._pageService.updatePage(this.pageId, new Page(this.page._id, this.pageName, this.page.websiteId, this.pageDescription)).subscribe(
        (data: Page) => {
          console.log(data);
          this.page = data;
          this.pageName = this.page.name;
          this.pageDescription = this.page.description;
          this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page']);
        },
        (error: any) => {
          console.log(error);
        });
  }

  delete () {
    this._pageService.deletePage(this.pageId).subscribe(
        (data: any) => {
            console.log(data);
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page']);
        },
        (error: any) => {
            console.log(error);
        });
  }
}
