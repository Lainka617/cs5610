// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/web-maker')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Origin", "https://webdev-luo-shiqi.herokuapp.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// var whitelist = ['http://localhost:4200', 'https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Fwebdev-luo-shiqi.herokuapp.com%2Fauth%2Ffacebook%2Fcallback&scope=email&client_id=333322564203480'];

// var options = {
//   origin: function (origin, callback) {
//     if(whitelist.indexOf(origin) != -1){
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by cors'));
//     }
//   }
// };

// app.use(cors(options));

require('./assignment/app')(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/web-maker/index.html'));
});

const port = process.env.PORT || '3200';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));

var connectionString = 'mongodb://heroku_1rs87wv8:3f84rl2u5vq0sfq8bqsg1cenj6@ds125896.mlab.com:25896/heroku_1rs87wv8';
var mongoose = require ('mongoose');
//var db = mongoose.connect('mongodb://localhost:27017/webdev',{useNewUrlParser:true});

var db = mongoose.connect(connectionString, {useNewUrlParser:true});




