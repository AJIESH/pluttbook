var express = require('express');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var fs = require('fs');
var bodyParser = require('body-parser');
var port = 4000;

//Database configuration =================================================
var db = monk('localhost:27017/nodetest1');

//Configuration ==========================================================
app.use(express.static('./public'));     //Sets the static files location
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // to support URL-encoded bodies

//Dynamically include routes==============================================
var route;
fs.readdirSync('./api/controllers').forEach(function(file){
   if(file.substr(-3) == '.js'){
       route = require('./api/controllers/' + file);
       route.controller(app, db);
   }
});

//Starts the server=======================================================
app.listen(port);
console.log('App listening on port: ' + port);