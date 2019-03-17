import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class PageService {

    constructor(private http: HttpClient) {}

    api = {
        'createPage' : this.createPage,
        'findPageByWebsiteId': this.findPageByWebsiteId,
        'findPageById' : this.findPageById,
        'updatePage' : this.updatePage,
        'deletePage' : this.deletePage
    };

    createPage(websiteId: string, page: Page) {
        return this.http.post( environment.baseUrl + '/api/website/' + websiteId + '/page', page);
    }

    findPageByWebsiteId(websiteId: string) {
        return this.http.get( environment.baseUrl + '/api/website/' + websiteId + '/page');
    }

    findPageById(pageId: string) {
        return this.http.get( environment.baseUrl + '/api/page/' + pageId);
    }

    updatePage(pageId: string, page: Page) {
        return this.http.put(
            environment.baseUrl + '/api/page/' + pageId,
            {
                name: page.name,
                description: page.description
            });
    }

    deletePage(pageId: string) {
        return this.http.delete( environment.baseUrl + '/api/page/' + pageId);
    }
}
