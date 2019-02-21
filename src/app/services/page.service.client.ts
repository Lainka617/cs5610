import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class PageService {

    constructor() {}

    pages = [
        {_id: '321', name: 'Post1', websiteId: '456', description: 'Lorem'},
        {_id: '432', name: 'Post2', websiteId: '456', description: 'Lorem'},
        {_id: '543', name: 'Post3', websiteId: '456', description: 'Lorem'}
    ];

    api = {
        'createPage' : this.createPage,
        'findPageByWebsiteId': this.findPageByWebsiteId,
        'findPageById' : this.findPageById,
        'updatePage' : this.updatePage,
        'deletePage' : this.deletePage
    };



    createPage(websiteId: String, page: Page) {

        const new_page = {
            _id: (new Date()).getTime() + '',
            name: page.name,
            websiteId: page.websiteId,
            description: page.description
        };

        this.pages.push(new_page);
    }

    findPageByWebsiteId(websiteId: String) {
        const resultSet = [];
        for ( const i in this.pages) {
            if (this.pages[i].websiteId === websiteId) {
                resultSet.push(this.pages[i]);
            }
        }
        return resultSet;
    }

    findPageByWebsiteId2(websiteId: String) {
        return this.pages.filter(function (page) {
            return page.websiteId === websiteId;
        });
    }

    findPageById(pageId: String) {
        return this.pages.find(function (page) {
            return page._id === pageId;
        });
    }

    updatePage(pageId: String, page: Page) {
        for (const i in this.pages) {
            if (this.pages[i]._id === pageId) {
                this.pages[i].name = page.name;
                this.pages[i].description = page.description;
            }
        }
    }

    deletePage(pageId: String) {
        for (const i in this.pages) {
            if (this.pages[i]._id === pageId) {
                const j = +i;
                this.pages.splice(j, 1);
            }
        }
    }
}
