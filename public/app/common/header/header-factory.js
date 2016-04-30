module.exports = function($http, $window, localStorageService){
    return {
        logout : logout
    };

    function logout() {
        return  $http.post('api/logout',{})
            .success(redirectToLogin)
            .error(redirectToLogin);
    }

    function redirectToLogin() {
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};