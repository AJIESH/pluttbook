require('angular');
require('angular-route');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-local-storage');
require('ng-file-upload');
var $ = require('jquery-browserify');

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
    profileCtrl = require('./profile/profile-ctrl.js'),
    profileFactory = require('./profile/profile-factory.js'),
    currentUserDataFactory = require('./common/current-user-data/current-user-data-factory.js'),
    friendsListCtrl = require('./common/friends-list/friends-list-ctrl.js'),
    friendsListFactory = require('./common/friends-list/friends-list-factory.js'),
    editPicturesCtrl = require('./profile/edit-pictures/edit-pictures-ctrl.js'),
    editPicturesFactory = require('./profile/edit-pictures/edit-pictures-factory.js'),
    availableUsersCtrl = require('./common/chat/available-users/available-users-ctrl.js'),
    availableUsersFactory = require('./common/chat/available-users/available-users-factory.js'),
    chatWindowCtrl = require('./common/chat/chat-window/chat-window-ctrl.js'),
    chatWindowFactory = require('./common/chat/chat-window/chat-window-factory.js');

var app = angular.module('app',['ngRoute', 'ngMaterial', 'ngFileUpload', 'LocalStorageModule']);


//Adds routes
var routes = require('./routes.js');
app.config(['$routeProvider', routes]);

//Login modules
app.controller('loginCtrl', ['$location', 'loginFactory', loginCtrl]);
app.factory('loginFactory', ['$http', '$location', 'localStorageService', loginFactory]);

//Create account modules
app.controller('createAccountCtrl', ['createAccountFactory', createAccountCtrl]);
app.factory('createAccountFactory', ['$http', createAccountFactory]);

//Create content feed modules
app.controller('feedCtrl', ['$scope', 'feedFactory', 'currentUserDataFactory', feedCtrl]);
app.factory('feedFactory', ['$q', '$http', '$routeParams', '$location', '$window', feedFactory]);

//Creates header modules
app.controller('headerCtrl', ['$mdDialog', '$mdMenu', '$routeParams', 'headerFactory', 'currentUserDataFactory', 'feedFactory', headerCtrl]);
app.factory('headerFactory', ['$rootScope', '$http', '$location', 'localStorageService', headerFactory]);

//Create news feed modules
app.controller('newsFeedCtrl', [newsFeedCtrl]);

//Creates status modules
app.controller('createStatusCtrl', ['createStatusFactory', 'feedFactory', createStatusCtrl]);
app.factory('createStatusFactory', ['$http', createStatusFactory]);

//Creates profile modules
app.controller('profileCtrl', ['$scope', 'profileFactory', 'currentUserDataFactory', '$routeParams', '$mdPanel', profileCtrl]);
app.factory('profileFactory', ['$http', '$routeParams', profileFactory]);

//Creates current user data factory
app.factory('currentUserDataFactory', ['$q', '$http', currentUserDataFactory]);

//Creates friends list modules
app.controller('friendsListCtrl', ['friendsListFactory', 'feedFactory', friendsListCtrl]);
app.factory('friendsListFactory', ['$http', '$routeParams', friendsListFactory]);

//Creates edit profile modules
app.controller('editPicturesCtrl', ['mdPanelRef', 'editPicturesFactory', 'Upload', 'profileFactory', 'feedFactory', 'currentUserDataFactory', editPicturesCtrl]);
app.factory('editPicturesFactory', ['$http', editPicturesFactory]);

//Creates chat modules
app.controller('availableUsersCtrl', ['$rootScope', '$timeout', '$mdPanel', '$q', 'availableUsersFactory', availableUsersCtrl]);
app.factory('availableUsersFactory', ['$http', availableUsersFactory]);
app.controller('chatWindowCtrl', ['$rootScope', 'mdPanelRef', 'userInfo', 'index', 'availableUsersFactory', 'chatWindowFactory', '$timeout', 'currentUserDataFactory', chatWindowCtrl]);
app.factory('chatWindowFactory', ['$http', chatWindowFactory]);


//Interceptor modules
app.factory('interceptor', ['$q', '$window', '$location', 'localStorageService', interceptorFactory])
    .config(function($httpProvider){
       $httpProvider.interceptors.push('interceptor');
    });


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('scroll', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection(attr.scroll, function(newVal) {
                $timeout(function() {
                    element[0].scrollTop = element[0].scrollHeight;
                });
            });
        }
    }
});

app.directive('ngBottom', function() {
    return function (scope, elm, attr) {
        var raw = elm[0];

        var funCheckBounds = function (evt) {
            var rectObject = raw.getBoundingClientRect();
            if (rectObject.bottom - window.innerHeight < 0) {
                scope.$apply(attr.ngBottom);
            }
        };
        angular.element(window).bind('scroll load', funCheckBounds);
    }
});

