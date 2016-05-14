module.exports = function($http, $window, localStorageService){
    return {
        logout : logout,
        getUserInfo: getUserInfo
    };

    function logout() {
        return  $http.post('api/logout',{})
            .success(redirectToLogin)
            .error(redirectToLogin);
    }

    function getUserInfo(){
        return $http.get('api/userInfo', {});
    }
    function redirectToLogin() {
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};