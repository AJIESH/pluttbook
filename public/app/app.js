require('angular');
require('angular-route');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-local-storage');

var loginCtrl = require('./login/login-ctrl.js'),
    loginFactory = require('./login/login-factory.js'),
    createAccountCtrl = require('./create-account/create-account-ctrl.js'),
    createAccountFactory = require('./create-account/create-account-factory.js'),
    interceptorFactory = require('./interceptor/interceptor-factory.js');

var app = angular.module('app',['ngRoute', 'ngMaterial', 'LocalStorageModule']);

//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
app.controller('loginCtrl', ['$scope', 'loginFactory', loginCtrl]);
app.factory('loginFactory', ['$http', 'localStorageService', loginFactory]);

//Create-account modules
app.controller('createAccountCtrl', ['$scope', 'createAccountFactory', createAccountCtrl]);
app.factory('createAccountFactory', ['$http', createAccountFactory]);

//Interceptor modules
app.factory('interceptor', ['localStorageService',interceptorFactory])
    .config(function($httpProvider){
       $httpProvider.interceptors.push('interceptor');
    });