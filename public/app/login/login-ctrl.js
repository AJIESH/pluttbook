module.exports = function($scope, loginFactory) {
    $scope.login = function(){
        var loginCredentials = bundleLoginCredentials();
        loginFactory.login(loginCredentials);
    };

    function bundleLoginCredentials(){
        return {
            email: $scope.email,
            password: $scope.password
        };
    }
};