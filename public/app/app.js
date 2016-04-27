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
    interceptorFactory = require('./interceptor/interceptor-factory.js'),
    newsFeedCtrl = require('./news-feed/news-feed-ctrl.js'),
    headerCtrl = require('./header/header-ctrl.js'),
    searchBarCtrl = require('./search-bar/search-bar-ctrl.js');

var app = angular.module('app',['ngRoute', 'ngMaterial', 'LocalStorageModule']);

//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
app.controller('loginCtrl', ['$scope', 'loginFactory', loginCtrl]);
app.factory('loginFactory', ['$http', '$window', 'localStorageService', loginFactory]);

//Create account modules
app.controller('createAccountCtrl', ['$scope', 'createAccountFactory', createAccountCtrl]);
app.factory('createAccountFactory', ['$http', createAccountFactory]);

//Create news feed modules
app.controller('newsFeedCtrl', ['$scope', newsFeedCtrl]);

//Creates header modules
app.controller('headerCtrl', ['$scope', '$mdDialog', headerCtrl]);

//Creates search bar modules
app.controller('searchBarCtrl', ['$scope', searchBarCtrl]);

//Interceptor modules
app.factory('interceptor', ['$window', 'localStorageService',interceptorFactory])
    .config(function($httpProvider){
       $httpProvider.interceptors.push('interceptor');
    });