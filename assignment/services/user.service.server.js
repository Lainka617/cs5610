'use strict';

const userModel = require('../model/user/user.model.server');
var passport = require('passport');
//var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    //app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
    var successRedirectUserId = '';
    //user api list
    app.get("/api/user/:userId", findUserById);
    app.get('/api/user', findUserByCredOrName);
    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUserById);

    app.post("/api/loggedin", loggedin);
    app.get("/facebook/login", passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}, function(req, res) {
            console.log("auth successful1");
            console.log(req);
            console.log(res);
        }
    ), (req, res) => {
        console.log("auth successful2");
        console.log(req);
        console.log(res);
        res.redirect('/user/' + successRedirectUserId);
    });

    passport.serializeUser(serializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(function (user) {
            done(null, user);
        }, function (err) {
            done(err, null);
        });
    }

    let facebookConfig = {
        clientID : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function localStrategy(username, password, done){
        userModel.findUserByCredentials(username, password).then(function (user) {
            console.log(bcrypt.compareSync(password, user.password));
            if (user.username === username && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
    }

    //function list
    function findUserById(req, res) {
        var id = req.params.userId;

        userModel.findUserById(id).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    function findUserByCredOrName(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCred(req, res);
        }
        else{
            findUserByUsername(req, res);
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.status(200).send({});
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("get token");
        userModel.findUserByFacebookId(profile.id).then(function (user) {
            if (user) {
                successRedirectUserId = user._id; 
                console.log(successRedirectUserId);
                return done(null, user);
            } else {
                var names = profile.displayName.split(" ");
                var newFacebookUser = {
                    lastName: names[1],
                    firstName: names[0],
                    email: profile.emails ? profile.emails[0].value : "",
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };
                console.log(profile.id);
                userModel.createUser(newFacebookUser)
                .then(function (user){
                    if(user) {
                       successRedirectUserId = user._id; 
                       console.log(successRedirectUserId);
                       return done(null, user);
                    }
                }, function (err) {
                    if (err) {
                        return done(err);
                    }
                });
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
    }

    function findUserByCred(req, res){
        var username = req.query["username"];
        var password = req.query["password"];
        console.log("by cred");

        userModel.findUserByCredentials(username, password).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    function findUserByUsername(req, res) {
        var name = req.query["username"];

        userModel.findUserByUserName(name).then(user => {
            if(user == null) {
                res.sendStatus(404);
            }
            else {
                res.send(user);
            }
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    //teacher in class demo to us
    function createUser(req, res) {
        var newUser = req.body;
        newUser.websites = [];
        console.log(newUser);
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel
            .createUser(newUser)
            .then(function (user){
                if(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        }
                        else{
                            res.json(user);
                        }
                    });
                }
            }, function(error){
                console.log(error);
                res.status(400).send(error);
            });
    }

    function updateUser(req, res) {
        userModel.updateUser(req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username
        }).then(user => {
            res.send(user);
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }

    function deleteUserById(req, res) {
        userModel.deleteUser(req.params.userId).then(data => {
            res.send({message: "delete successful"});
        }, error => {
            console.log(error);
            res.status(400).send(error);
        });
    }
}




