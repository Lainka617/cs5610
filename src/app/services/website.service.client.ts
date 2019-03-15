import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsiteService {

    constructor(private http: HttpClient) {}

    websites = [
        {'_id': '123', 'name': 'Facebook', 'developerId': '123', 'description': 'Lorem1' },
        {'_id': '234', 'name': 'Twittter', 'developerId': '456', 'description': 'Lorem2' },
        {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem3' },
        {'_id': '890', 'name': 'Microsoft', 'developerId': '234', 'description': 'Lorem4' },
        {'_id': '567', 'name': 'Google', 'developerId': '123', 'description': 'Lorem5' },
        {'_id': '678', 'name': 'Uber', 'developerId': '234', 'description': 'Lorem6' },
        {'_id': '671', 'name': 'Lyft', 'developerId': '345', 'description': 'Lorem7' },
        {'_id': '789', 'name': 'Zillow', 'developerId': '345', 'description': 'Lorem8' }
    ];

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
        return this.http.get(environment.baseUrl + '/api/user/:userId/website' + userId);
    }

    findWebsitesById(websiteId: string) {
        return this.http.get(environment.baseUrl + '/api/website/' + websiteId);
    }

    updateWebsite(websiteId: string, website: Website) {
        return this.http.put(
            environment.baseUrl + '/api/website/' + websiteId,
            null,
            {
                params: {
                    id: websiteId,
                    name: website.name,
                    description: website.description
                }
            });
    }


    deleteWebsite(websiteId: string) {
        return this.http.get(environment.baseUrl + '/api/website/' + websiteId);
    }
}
