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
        return {
            token: localStorageService.get('authorizationData').token
        };
    }

    function redirectToLogin(){
        $window.location.href = '/#/login';
    }
};