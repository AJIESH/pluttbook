module.exports = function($http, $routeParams){
   return {
       getUserInfo: getUserInfo
    };

    function getUserInfo(){
        var route = 'api/userInfo';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '?userid=' + $routeParams.userid;
        }
        return $http.get(route, {});
    }
};