module.exports = function($http, $window, localStorageService){
    return {
        logout : logout
    };

    function logout() {
        return  $http.post('api/logout', getToken())
            .success(redirectToLogin)
            .error(redirectToLogin);
    }

    function getToken(){
        var authData =  localStorageService.get('authorizationData');

        if(authData){
            var token =  {
                token: localStorageService.get('authorizationData').token
            };

            if(token.token === null){
                redirectToLogin();
            }
        }
        else{
            redirectToLogin()
        }

        return token;
    }

    function redirectToLogin() {
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};