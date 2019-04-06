var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('User', userSchema);

userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserByUserName = findUserByUserName;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.deleteUser = deleteUser;

module.exports = userModel;

var api = {
    findUserByFacebookId: findUserByFacebookId,
};

//functions gp here
function findUserByFacebookId(facebookId) {
    return User.findOne({'facebook.id': facebookId});
}

function createUser(user){
    return userModel.create(user);
}

function updateUser(userId, user){
    return userModel.findOneAndUpdate({_id: userId}, user, {new: true});
}

function findUserByUserName(username){
    return userModel.findOne({ username: username });
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId){
    return userModel.findOne({_id: userId});
}

function deleteUser(userId){
    return userModel.findOneAndDelete({_id: userId});
}