module.exports = function($scope, createAccountFactory) {
    $scope.createAccount = function(){
        var accountDetails = bundleAccountDetails();
        createAccountFactory.createAccount(accountDetails);
    };

    function bundleAccountDetails(){
        return {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password,
            confirmPassword: $scope.confirmPassword
        };
    }
};