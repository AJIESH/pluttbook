var loginCtrl = require('./login/login-ctrl');
var createAccountCtrl = require('./create-account/create-account-ctrl');
var newsFeedCtrl = require('./news-feed/news-feed-ctrl');
var headerCtrl = require('./header/header-ctrl');

module.exports = function($routeProvider){
  $routeProvider
  .when('/login', {
          templateUrl: './app/login/login.html',
          controller: loginCtrl
  })
  .when('/create-account', {
          templateUrl: './app/create-account/create-account.html',
          controller: createAccountCtrl
  })
  .when('/news-feed', {
          templateUrl: './app/header/header.html',
          controller: headerCtrl
  })
  .otherwise({redirectTo: '/login'});
};