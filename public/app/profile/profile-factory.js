module.exports = function($http, $routeParams){
   return {
       getUserInfo: getUserInfo,
       addFriend: addFriend,
       isUserFriend: isUserFriend
    };

    function getUserInfo(){
        var route = 'api/userInfo';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '?userid=' + $routeParams.userid;
        }
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
            route = route + '?userid=' + $routeParams.userid;
        }
        return $http.get(route, {});
    }
};