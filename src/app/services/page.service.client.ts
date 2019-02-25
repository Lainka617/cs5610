import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class PageService {

    constructor() {}

    pages = [
        {_id: '321', name: 'Post1', websiteId: '123', description: 'Lorem1'},
        {_id: '432', name: 'Post2', websiteId: '123', description: 'Lorem2'},
        {_id: '543', name: 'Post3', websiteId: '234', description: 'Lorem3'},
        {_id: '654', name: 'Post4', websiteId: '234', description: 'Lorem4'},
        {_id: '765', name: 'Post5', websiteId: '890', description: 'Lorem5'},
        {_id: '876', name: 'Post6', websiteId: '890', description: 'Lorem6'},
        {_id: '987', name: 'Post7', websiteId: '456', description: 'Lorem7'},
        {_id: '123', name: 'Post8', websiteId: '456', description: 'Lorem8'},
        {_id: '234', name: 'Post9', websiteId: '567', description: 'Lorem9'},
        {_id: '345', name: 'Post10', websiteId: '567', description: 'Lorem10'},
        {_id: '456', name: 'Post11', websiteId: '678', description: 'Lorem11'},
        {_id: '567', name: 'Post12', websiteId: '678', description: 'Lorem12'},
        {_id: '678', name: 'Post13', websiteId: '671', description: 'Lorem13'},
        {_id: '789', name: 'Pos14', websiteId: '671', description: 'Lorem14'},
        {_id: '890', name: 'Post15', websiteId: '789', description: 'Lorem15'},
        {_id: '901', name: 'Post16', websiteId: '789', description: 'Lorem16'}
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
            _id: page._id,
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
