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
    feedCtrl = require('./common/feed-content/feed-content-ctrl.js'),
    feedFactory = require('./common/feed-content/feed-content-factory.js'),
    headerCtrl = require('./common/header/header-ctrl.js'),
    headerFactory = require('./common/header/header-factory.js'),
    newsFeedCtrl = require('./news-feed/news-feed-ctrl.js'),
    createStatusCtrl = require('./common/create-status/create-status-ctrl.js'),
    createStatusFactory = require('./common/create-status/create-status-factory.js'),
    profileCtrl = require('./profile/profile-ctrl.js');

var app = angular.module('app',['ngRoute', 'ngMaterial', 'LocalStorageModule']);

//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
app.controller('loginCtrl', ['loginFactory', loginCtrl]);
app.factory('loginFactory', ['$http', '$window', 'localStorageService', loginFactory]);

//Create account modules
app.controller('createAccountCtrl', ['createAccountFactory', createAccountCtrl]);
app.factory('createAccountFactory', ['$http', createAccountFactory]);

//Create content feed modules
app.controller('feedCtrl', ['feedFactory', feedCtrl]);
app.factory('feedFactory', ['$http', '$q', feedFactory]);

//Creates header modules
app.controller('headerCtrl', ['$mdDialog', '$mdMenu', 'headerFactory', headerCtrl]);
app.factory('headerFactory', ['$http', '$window', 'localStorageService', headerFactory]);

//Create news feed modules
app.controller('newsFeedCtrl', [newsFeedCtrl]);

//Creates status modules
app.controller('createStatusCtrl', ['createStatusFactory', 'feedFactory', createStatusCtrl]);
app.factory('createStatusFactory', ['$http', createStatusFactory]);

//Creates profile modules
app.controller('profileCtrl', ['headerFactory', profileCtrl]);

//Interceptor modules
app.factory('interceptor', ['$q', '$window', 'localStorageService',interceptorFactory])
    .config(function($httpProvider){
       $httpProvider.interceptors.push('interceptor');
    });