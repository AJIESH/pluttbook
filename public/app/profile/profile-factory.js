module.exports = function($http, $routeParams){
    var pictureData = {
        pictures: null
    };

    return {
       getUserInfo: getUserInfo,
       getCurrentUserInfo: getCurrentUserInfo,
       addFriend: addFriend,
       isUserFriend: isUserFriend,
       getPictures: getPictures,
       setPictureData: setPictureData,
       pictureData: pictureData
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
        var route = 'api/isfriend';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
        return $http.get(route, {});
    }

    function getPictures(){
        var route = 'api/photos' + '/' + $routeParams.userid;
        return $http.get(route, {});
    }

    function setPictureData(pictures){
        pictureData.pictures = pictures;
    }
};