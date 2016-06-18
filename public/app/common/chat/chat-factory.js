module.exports = function($http){

    return {
        getAvailableFriends: getAvailableFriends
    };

    function getAvailableFriends(){
        var route = 'api/availableFriends';
        return $http.get(route);
    }
};