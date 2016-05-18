var loginCtrl = require('./login/login-ctrl');
var createAccountCtrl = require('./create-account/create-account-ctrl');
var newsFeedCtrl = require('./news-feed/news-feed-ctrl');
var profileCtrl = require('./my-profile/my-profile-ctrl');

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
          templateUrl: './app/news-feed/news-feed.html',
          controller: newsFeedCtrl
  })
  .when('/profile/userid/:userid', {
          templateUrl: './app/my-profile/my-profile.html',
          controller: profileCtrl
  })
  .otherwise({redirectTo: '/login'});
};