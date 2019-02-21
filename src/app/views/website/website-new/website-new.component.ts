import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') editForm: NgForm;
  userId: string;
  websites: any[];
  websiteName: string;
  websiteDes: string;

  constructor(private _websiteService: WebsiteService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      console.log('website id: ' + this.userId);
    });

    this.websites = this._websiteService.findWebsitesByUser(this.userId);
  }

  add () {
    console.log(this.userId);
    this._websiteService.createWebsite(this.userId, new Website('321', this.websiteName, this.userId, this.websiteDes))
  }


}

