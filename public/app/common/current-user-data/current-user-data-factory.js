module.exports = function($q, $http){

    activate();

    function activate(){
        console.log('Activate');
    }

    var userInfo = $q.defer();
    var userFriends = $q.defer();

    return {
        getUserInfo: getUserInfo,
        setUserInfoObject: setUserInfoObject,
        getUserInfoObject: getUserInfoObject,
        getUserFriends: getUserFriends,
        getFriendsObject: getFriendsObject
    };

    function getUserInfo(){
        //userInfo = $q.defer();
        return $http.get('api/userInfo', {});
    }

    function setUserInfoObject(info){
        userInfo.resolve(info);
    }

    function getUserInfoObject(){
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