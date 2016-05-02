module.exports = function($http){
    return {
        postStatus: postStatus
    };

    function postStatus(status) {
        return $http.post('api/status', status);
    }
};