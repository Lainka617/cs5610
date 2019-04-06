import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FlickrService {
    key = '5423184dbaf2f220dd205acb13b8094d';
    secret = '51fc8cd0b76a873d';
    flickerUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

    constructor(private http: HttpClient) {
    }

    searchPhotos(searchTerm: any) {
        const url = this.flickerUrl
            .replace('API_KEY', this.key)
            .replace('TEXT', searchTerm);
        return this.http.get(url, {responseType: 'text'});
    }
}