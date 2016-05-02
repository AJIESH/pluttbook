module.exports = function($http){
    return {
        createAccount : createAccount
    };

    function createAccount(newAccountDetails) {
        return  $http.post('api/createAccount', newAccountDetails)
            .success(createAccountSuccess)
            .error(createAccountError);
    }

    function createAccountSuccess(response){
        console.log(response);
    }

    function createAccountError(response){
        console.log(response);
    }
};