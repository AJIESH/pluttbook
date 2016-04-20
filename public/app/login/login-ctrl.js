module.exports = function($scope, loginFactory) {
    $scope.login = function(){
        var loginCredentials = bundleLoginCredentials();
        loginFactory.login(loginCredentials);
    };

    $scope.test = function(){
        loginFactory.test();
    };

    function bundleLoginCredentials(){
        return {
            username: $scope.email,
            password: $scope.password
        };
    }
};