module.exports = function($http, localStorageService){
    return {
        login : login
    };

    function login(loginCredentials) {
        return  $http.post('api/login', loginCredentials)
            .success(loginSuccess)
            .error(loginError);

        function loginSuccess(response){
            console.log(response);
        }

        function loginError(response){
            console.log(response);
        }
    }

    
};