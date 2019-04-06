
var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server')

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName:String,
    lastName: String,
    email: String,
    websites:[websiteSchema],
    facebook: {
        id: String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now()}
}, {collection:'Users'});

module.exports = UserSchema;
