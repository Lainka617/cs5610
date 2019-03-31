import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsiteService } from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Website } from '../../../models/website.model.client';
import {getRandomId} from '../../../common';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') editForm: NgForm;
  userId: string;
  websites: any[] = [];
  websiteName: string;
  websiteDes: string;

  constructor(private _websiteService: WebsiteService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      console.log('website id: ' + this.userId);
    });

    this._websiteService.findWebsitesByUser(this.userId).subscribe(
        (data: Website[]) => {
          console.log(data);
          this.websites = data == null ? [] : data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  addWebsite () {
    // generate id for new website, just use 321 by now.
    // will add random unique id generating logic later
    this._websiteService.createWebsite(this.userId, new Website(getRandomId(1000), this.websiteName, this.userId, this.websiteDes)).subscribe(
        (data: Website) => {
          console.log(data);
          this.websites.push(data);
          this.router.navigate(['/user/' + this.userId + '/website']);
        },
        (error: any) => {
          console.log(error);
        });

  }
}

