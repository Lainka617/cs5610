import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsiteService {

    constructor(private http: HttpClient) {}

    api = {
        'createWebsite' : this.createWebsite,
        'findWebsiteByUser' : this.findWebsitesByUser,
        'findWebsiteById' : this.findWebsitesById,
        'updateWebsite' : this.updateWebsite,
        'deleteWebsite' : this.deleteWebsite
    };

    createWebsite(userId: string, website: Website) {
        return this.http.post( environment.baseUrl + '/api/user/' + userId + '/website', website);
    }

    findWebsitesByUser(userId: string) {
        return this.http.get(environment.baseUrl + '/api/user/' + userId + '/website');
    }

    findWebsitesById(websiteId: string) {
        return this.http.get(environment.baseUrl + '/api/website/' + websiteId);
    }

    updateWebsite(websiteId: string, website: Website) {
        return this.http.put(
            environment.baseUrl + '/api/website/' + websiteId,
            {
                name: website.name,
                description: website.description
            });
    }

    deleteWebsite(websiteId: string) {
        return this.http.delete(environment.baseUrl + '/api/website/' + websiteId);
    }
}
