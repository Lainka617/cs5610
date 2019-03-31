import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FlickrService } from '../../../../services/flickr.service.client';
import { WidgetService } from '../../../../services/widget.service.client';
import { Widget } from '../../../../models/widget.model.client';


@Component({
    selector: 'app-flickr-image-search',
    templateUrl: './flickr-image-search.component.html',
    styleUrls: ['./filckr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {
    searchText: string;
    photos = {photo: []};
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: Widget;

    constructor(private _widgetService: WidgetService, private _flickrService: FlickrService, private _activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(
            (params: any) => {
                this.pageId = params['pid'];
                this.userId = params['uid'];
                this.websiteId = params['wid'];
                this.widgetId = params['wgid'];
            });
    }

    searchPhotos() {
        this._flickrService
            .searchPhotos(this.searchText)
            .subscribe(
                (data) => {
                    console.log(data);
                    let str = data.replace('jsonFlickrApi(', '');
                    str = str.substring(0, str.length - 1);
                    const temp = JSON.parse(str);
                    console.log(temp);
                    this.photos = temp.photos;
                }
            );
    }

    selectPhoto(photo) {
        let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
        url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

        this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId + '/image', {imageUrl: url}]);
    }
}
