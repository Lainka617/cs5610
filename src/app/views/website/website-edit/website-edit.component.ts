import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';
// import { faUser, faChevronLeft, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') editForm: NgForm;
  userId: string;
  websiteName: string;
  websiteDescription: string;
  websites: any[];
  website: Website;

  constructor(private _websiteService: WebsiteService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.website = this._websiteService.findWebsitesById(params['wid']);
      console.log('website id: ' + this.userId);
      this.websiteName = this.website.name;
      this.websiteDescription = this.website.description;
    });

    this.websites = this._websiteService.findWebsitesByUser(this.userId);
  }

  update () {
    this._websiteService.updateWebsite(this.website._id, new Website(this.website._id, this.websiteName, this.website.developerId, this.websiteDescription));
    let websiteTest = this._websiteService.findWebsitesById(this.website._id);
    console.log(websiteTest.name);
    console.log(websiteTest.description);
  }

  delete () {
    this._websiteService.deleteWebsite(this.website._id);
  }

}

