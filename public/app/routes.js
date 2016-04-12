var loginCtrl = require('./login/login-ctrl');
var register = require('./create-account/create-account-ctrl');

module.exports = function($routeProvider){
  $routeProvider
  .when('/login', {
          templateUrl: './app/login/login.html',
          controller: loginCtrl
  })
  .when('/create-account', {
          templateUrl: './app/create-account/create-account.html',
          controller: register
  })
  .otherwise({redirectTo: '/login'});
};