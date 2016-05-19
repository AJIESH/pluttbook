module.exports = function($q, $http){
    var userInfo = $q.defer();
    var userFriends = $q.defer();

    return {
        getUserInfo: getUserInfo,
        getUserObject: getUserObject,
        getUserFriends: getUserFriends,
        getFriendsObject: getFriendsObject
    };

    function getUserInfo(){
        $http.get('api/userInfo', {}).then(function(data){
            userInfo.resolve(data.data);
        });
    }

    function getUserObject(){
        return userInfo.promise;
    }

    function getUserFriends(){
        userFriends = $q.defer();
        $http.get('api/friends', {}).then(function(data){
            userFriends.resolve(data.data);
        });
    }

    function getFriendsObject(){
        return userFriends.promise;
    }
};