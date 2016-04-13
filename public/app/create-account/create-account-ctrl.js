module.exports = function($scope, createAccountFactory) {
    $scope.createAccount = function(){
        var accountDetails = bundleAccountDetails();
        createAccountFactory.createAccount(accountDetails);
    };

    function bundleAccountDetails(){
        return {
            email: $scope.email,
            password: $scope.password,
            confirmPassword: $scope.confirmPassword
        };
    }
};