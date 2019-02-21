import { Component, OnInit } from '@angular/core';
import {Page} from "../../../models/page.model.client";
import {PageService} from "../../../services/page.service.client";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private _pageService: PageService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
    );
  }

  add () {
    this._pageService.createPage(this.websiteId, new Page('654', this.pageName, this.websiteId, this.pageDes));
  }

}
