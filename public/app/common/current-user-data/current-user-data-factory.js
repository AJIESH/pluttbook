module.exports = function($q, $http){

    var userInfo = $q.defer();
    var userFriends = $q.defer();
    var profilePicture = $q.defer();

    return {
        getUserInfo: getUserInfo,
        setUserInfoObject: setUserInfoObject,
        getUserInfoObject: getUserInfoObject,
        getUserFriends: getUserFriends,
        getFriendsObject: getFriendsObject,
        getProfilePicture: getProfilePicture,
        getProfilePictureObject: getProfilePictureObject
    };

    function getUserInfo(){
        profilePicture = $q.defer();
        userInfo = $q.defer();
        return $http.get('api/userInfo', {});
    }

    function setUserInfoObject(info){
        userInfo.resolve(info);
        getProfilePicture(info.userId);
    }

    function getUserInfoObject(){
        return userInfo.promise;
    }

    function getUserFriends(){
        userFriends = $q.defer();
        $http.get('api/friends', {})
            .success(function(data){
                userFriends.resolve(data);
            });
    }

    function getFriendsObject(){
        return userFriends.promise;
    }

    function getProfilePicture(userId){
        $http.get('api/profile_photo/' + userId)
            .success(function(data){
                profilePicture.resolve(data);
            })
            .error(function(){
                console.log('Error retrieving profile picture');
            });
    }

    function getProfilePictureObject(){
        return profilePicture.promise;
    }
};