import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {getRandomId} from '../../../common';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  websiteId: string;
  userId: string;
  pageName: string;
  pageDes: string;
  page: Page;

  constructor(private _pageService: PageService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
    );
  }

  addPage () {
    // generate id for new page, just use 101 by now.
    // will add random unique id generating logic later
    this._pageService.createPage(this.websiteId, new Page(getRandomId(1000), this.pageName, this.websiteId, this.pageDes)).subscribe(
        (data: Page) => {
          console.log(data);
          this.page = data;
          this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page']);
        },
        (error: any) => {
          console.log(error);
        });
  }

}
