module.exports = function($http){
    return {
        postStatus: postStatus
    };

    function postStatus(status) {
        return $http.post('api/status', status);
    }

    function postStatusSuccess(response){
        console.log(response);
    }

    function postStatusError(response){
        console.log(response);
    }
};