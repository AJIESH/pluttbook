module.exports = function($http){

    var currentIndex = 0;

    return {
        getAvailableFriends: getAvailableFriends,
        getSetIndex: getSetIndex,
        getNotifications: getNotifications
    };

    function getAvailableFriends(){
        var route = 'api/availableFriends';
        return $http.get(route);
    }

    function getSetIndex(index){
        if(index !== undefined){
            currentIndex = index;
        }
        else{
            return currentIndex;
        }
    }

    function getNotifications(){
        return $http.get('api/notifications');
    }
};