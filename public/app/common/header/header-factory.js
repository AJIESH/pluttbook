module.exports = function($http, $location, localStorageService){

    return {
        goToNewsFeed: goToNewsFeed,
        logout : logout,
        goToProfile: goToProfile
    };

    function goToNewsFeed(){
        $location.path('/news-feed');
    }

    function logout(){
        return  $http.post('api/logout',{})
            .success(redirectToLogin)
            .error(redirectToLogin);
    }

    function goToProfile(userId){
        $location.path('/profile/userid/' + userId);
    }

    function redirectToLogin(){
        localStorageService.clearAll();
        $location.path('/login');
    }
};