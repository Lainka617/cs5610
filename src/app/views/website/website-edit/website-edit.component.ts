import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private _websiteService: WebsiteService, private _activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this._websiteService.findWebsitesById(params['wid']).subscribe(
          (data: Website) => {
            console.log(data);
            this.website = data;
            this.websiteName = this.website.name;
            this.websiteDescription = this.website.description;
          },
          (error: any) => {
            console.log(error);
          });
    });

    this._websiteService.findWebsitesByUser(this.userId).subscribe(
        (data: Website[]) => {
          console.log(data);
          this.websites = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  update () {
    this._websiteService.updateWebsite(this.website._id, new Website(this.website._id, this.websiteName, this.website.developerId, this.websiteDescription)).subscribe(
        (data: Website) => {
          console.log(data);
          this.website = data;
          this.websiteName = this.website.name;
          this.websiteDescription = this.website.description;
          this.router.navigate(['/user/' + this.userId + '/website']);
        },
        (error: any) => {
          console.log(error);
        });
  }

  delete () {
    this._websiteService.deleteWebsite(this.website._id).subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate(['/user/' + this.userId + '/website']);
        },
        (error: any) => {
          console.log(error);
        });
  }

}

