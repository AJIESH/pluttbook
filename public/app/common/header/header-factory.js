module.exports = function($rootScope, $http, $location, localStorageService){

    return {
        goToNewsFeed: goToNewsFeed,
        search: search,
        logout : logout,
        goToProfile: goToProfile
    };

    function goToNewsFeed(){
        $location.path('/news-feed');
    }

    function search(query) {
        return $http.get('api/search/' + query, {});
    }

    function logout(){
        $rootScope.$broadcast('stop-loops');
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