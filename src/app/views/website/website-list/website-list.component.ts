import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../../../services/website.service.client';
import { ActivatedRoute } from '@angular/router';
import { Website } from '../../../models/website.model.client';
import { faUser, faChevronLeft, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: string;
  websites: Website[];
  faUser = faUser;
  faChevronLeft = faChevronLeft;
  faCog = faCog;
  constructor(private _websiteService: WebsiteService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      console.log('user id: ' + this.userId);
    });

    this.websites = this._websiteService.findWebsitesByUser(this.userId);
    this.websites.forEach(web => {
      console.log(web._id);
    });
  }
}
