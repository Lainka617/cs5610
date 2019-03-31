var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model("Website", websiteSchema);

var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsite(userId,website) {
    return websiteModel.create(website)
        .then(
            function (website) {
                userModel.findUserById(userId)
                    .then(
                        function (user) {
                            user.websites.push(website);
                            userModel.updateUser(userId, user).then(data =>{
                                console.log(data);
                            });
                        }
                    );
                return website;
            }
        )
}

function findWebsitesByUser(userId) {
    return websiteModel.find({developerId: userId});
}

function findWebsiteById(id) {
    return websiteModel.findOne({_id: id});
}

function updateWebsite(id, website) {
    return websiteModel.findOneAndUpdate({_id: id}, website, {new: true});
}

function deleteWebsite(id){
    return websiteModel.findOneAndDelete({_id: id});
}
