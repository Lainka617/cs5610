var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model("Page", pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(webId, page) {
    return pageModel.create(page)
        .then(
            function (createdPage) {
                websiteModel.findWebsiteById(webId)
                    .then(
                        function (website) {
                            website.pages.push(createdPage);
                            websiteModel.updateWebsite(webId,website).then(data => {
                                console.log(data);
                            });
                        }
                    );
                return createdPage;
            }
        );
}

function findPagesByWebsiteId(websiteId) {
    return pageModel.find({websiteId: websiteId});
}

function findPageById(pageId){
    return pageModel.findOne({_id: pageId});
}

function updatePage(pageId,page) {
    return pageModel.findOneAndUpdate({_id: pageId}, page, {new: true});
}

function deletePage(pageId) {
    return pageModel.findOneAndRemove({_id: pageId});
}
