var loginCtrl = require('./login/login-ctrl');
var createAccountCtrl = require('./create-account/create-account-ctrl');
var newsFeedCtrl = require('./news-feed/news-feed-ctrl');
var profileCtrl = require('./profile/profile-ctrl');

module.exports = function($routeProvider){
  $routeProvider
  .when('/login', {
          templateUrl: './app/login/login.html',
          controller: loginCtrl,
          controllerAs: 'vm'
  })
  .when('/create-account', {
          templateUrl: './app/create-account/create-account.html',
          controller: createAccountCtrl,
          controllerAs: 'vm'
  })
  .when('/news-feed', {
          templateUrl: './app/news-feed/news-feed.html',
          controller: newsFeedCtrl,
          controllerAs: 'vm'
  })
  .when('/profile/userid/:userid', {
          templateUrl: './app/profile/profile.html',
          controller: profileCtrl,
          controllerAs: 'vm'
  })
  .otherwise({redirectTo: '/login'});
};