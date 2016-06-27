module.exports = function($http){
    return {
        createAccount : createAccount
    };

    function createAccount(newAccountDetails) {
        return  $http.post('api/createAccount', newAccountDetails);
    }
};