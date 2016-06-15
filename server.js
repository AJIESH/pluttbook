var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var oauthServer = require('oauth2-server');
var validate = require('express-validation');
var port = 4000;

//Database configuration =================================================
var url = 'localhost:27017/nodetest1';
var db = mongoose.connect('localhost:27017/nodetest1');

//Configuration ==========================================================
app.use(express.static('./public'));     //Sets the static files location
app.use(bodyParser.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(bodyParser.json({
    limit: 1000000
})); //to suport uploading images
app.oauth = oauthServer({
    model: require('./api/dbFunctions/OAuth.js'),
    grants: ['password']
});

//Dynamically include models=============================================
var models;
fs.readdirSync('./api/models').forEach(function(file){
    if(file.substr(-3) == '.js'){
        models = require('./api/models/' + file);
        models.model(db);
    }
});

//Dynamically include routes==============================================
var route;
fs.readdirSync('./api/controllers').forEach(function(file){
   if(file.substr(-3) == '.js'){
       route = require('./api/controllers/' + file);
       route.controller(app);
   }
    else{
       var folderRoute = './api/controllers/' + file;
       fs.readdirSync(folderRoute).forEach(function(folderFile){
           route = require(folderRoute + '/' + folderFile);
           route.controller(app);
       })
   }
});

//Starts the server=======================================================
app.listen(port);
console.log('App listening on port: ' + port);