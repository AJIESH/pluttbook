module.exports = function($http, $window, localStorageService){
    return {
        goToNewsFeed: goToNewsFeed,
        logout : logout,
        getUserInfo: getUserInfo,
        goToProfile: goToProfile
    };

    function goToNewsFeed(){
        $window.location.href = '/#/news-feed'
    }

    function logout(){
        return  $http.post('api/logout',{})
            .success(redirectToLogin)
            .error(redirectToLogin);
    }

    function getUserInfo(){
        return $http.get('api/userInfo', {});
    }

    function goToProfile(){
        $window.location.href = '/#/profile';
    }

    function redirectToLogin(){
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};