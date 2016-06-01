module.exports = function($http, $routeParams){
   return {
       getUserInfo: getUserInfo,
       getCurrentUserInfo: getCurrentUserInfo,
       addFriend: addFriend,
       isUserFriend: isUserFriend
    };

    function getUserInfo(){
        var route = 'api/userInfo';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
        return $http.get(route, {});
    }

    function getCurrentUserInfo(){
        var route = 'api/userInfo';
        return $http.get(route, {});
    }


    function addFriend(){
        if($routeParams.hasOwnProperty('userid')){
            var body = {
                friendId: $routeParams.userid
            };
            return $http.post('api/friends', body);
        }
    }

    function isUserFriend(){
        var route = 'api/friends';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
        return $http.get(route, {});
    }
};