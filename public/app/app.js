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
    feedCtrl = require('./feed-content/feed-content-ctrl.js'),
    headerCtrl = require('./header/header-ctrl.js'),
    headerFactory = require('./header/header-factory.js'),
    newsFeedCtrl = require('./news-feed/news-feed-ctrl.js');

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

//Create content feed modules
app.controller('feedCtrl', ['$scope', feedCtrl]);

//Creates header modules
app.controller('headerCtrl', ['$scope', '$mdDialog', 'headerFactory', headerCtrl]);
app.factory('headerFactory', ['$http', '$window', 'localStorageService', headerFactory]);

//Create news feed modules
app.controller('newsFeedCtrl', ['$scope', newsFeedCtrl]);

//Interceptor modules
app.factory('interceptor', ['$window', 'localStorageService',interceptorFactory])
    .config(function($httpProvider){
       $httpProvider.interceptors.push('interceptor');
    });