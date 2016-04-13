require('angular');
require('angular-route');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-messages');
var loginCtrl = require('./login/login-ctrl.js'),
    createAccountCtrl = require('./create-account/create-account-ctrl.js'),
    createAccountFactory = require('./create-account/create-account-factory.js');

var app = angular.module('app',['ngRoute', 'ngMaterial']);

//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
app.controller('loginCtrl', ['$scope', '$http', loginCtrl]);

//Create-account modules
app.controller('createAccountCtrl', ['$scope', 'createAccountFactory', createAccountCtrl]);
app.factory('createAccountFactory', ['$http', createAccountFactory]);