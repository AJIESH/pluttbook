var express = require('express');
var app = express();
//var mongo = require('mongodb');
var port = 4000;
//var databaseConfig = require('./config/database');

module.exports = app;

//Configuration ==========================================================
app.use(express.static('./public'));     //Sets the static files location

//Routes =================================================================
//require('./api/routes.js')(app);

//Listen (start app with node server.js ==================================
app.listen(port);
console.log('App listening on port: ' + port);