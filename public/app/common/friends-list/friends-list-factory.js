module.exports = function($http, $routeParams){

    return {
        getFriends: getFriends
    };

    function getFriends(){
        var route = 'api/friends';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
        return $http.get(route);
    }


};