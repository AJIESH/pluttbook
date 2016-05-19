module.exports = function($http, $window, localStorageService){

    return {
        goToNewsFeed: goToNewsFeed,
        logout : logout,
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

    function goToProfile(userId){
        $window.location.href = '/#/profile/userid/' + userId;
    }

    function redirectToLogin(){
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};