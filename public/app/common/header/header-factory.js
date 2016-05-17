module.exports = function($q, $http, $window, localStorageService){
    var userInfo = $q.defer();

    return {
        goToNewsFeed: goToNewsFeed,
        logout : logout,
        getUserInfo: getUserInfo,
        getUserObject: getUserObject,
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
        $http.get('api/userInfo', {}).then(function(data){
            userInfo.resolve(data.data);
        });
    }

    function getUserObject(){
        return userInfo.promise;
    }

    function goToProfile(){
        $window.location.href = '/#/profile';
    }

    function redirectToLogin(){
        localStorageService.clearAll();
        $window.location.href = '/#/login';
    }
};