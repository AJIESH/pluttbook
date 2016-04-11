require('angular');
require('angular-route');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-messages');

var app = angular.module('app',['ngRoute', 'ngMaterial']);

//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
var loginCtrl = require('./login/login-ctrl.js');
app.controller('loginCtrl', ['$scope', loginCtrl]);

//Register modules
var createAccountCtrl = require('./create-account/create-account-ctrl.js');
app.controller('createAccountCtrl', ['$scope', createAccountCtrl]);
