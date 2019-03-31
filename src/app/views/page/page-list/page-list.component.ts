import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})

export class PageListComponent implements OnInit {

  websiteId: string;
  userId: string;
  pages: Page[] = [];

  constructor(private _pageService: PageService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          console.log(this.userId);
          console.log(this.websiteId);
        }
    );

    this._pageService.findPageByWebsiteId(this.websiteId).subscribe(
        (data: Page[]) => {
            console.log(data);
            this.pages = data == null ? [] : data;
        },
        (error: any) => {
            console.log(error);
        });
  }
}
