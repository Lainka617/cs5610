import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class WebsiteService {

    constructor() {}

    websites = [
        {'_id': '123', 'name': 'Facebook', 'developerId': '123', 'description': 'Lorem' },
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

    createWebsite(userId: String, website: Website) {

        const new_website: Website = {
            _id: (new Date()).getTime() + '',
            name: website.name,
            developerId: website.developerId,
            description: website.description
        };

        this.websites.push(new_website);
    }

    findWebsitesByUser(userId: String) {
        const resultSet = [];
        for ( const i in this.websites) {
            if (this.websites[i].developerId === userId) {
                resultSet.push(this.websites[i]);
            }
        }
        return resultSet;
    }

    findWebsitesByUser2(userId: String) {
        return this.websites.filter(function (website) {
            return website.developerId === userId;
        });
    }

    findWebsitesById(websiteId: String) {
        return this.websites.find(function (website) {
            return website._id === websiteId;
        });
    }

    updateWebsite(websiteId: String, website: Website) {
        for (const i in this.websites) {
            if (this.websites[i]._id === websiteId) {
                this.websites[i].name = website.name;
                this.websites[i].description = website.description;
            }
        }
    }

    deleteWebsite(websiteId: String) {
        for (const i in this.websites) {
            if (this.websites[i]._id === websiteId) {
                const j = +i;
                this.websites.splice(j, 1);
            }
        }
    }
}
