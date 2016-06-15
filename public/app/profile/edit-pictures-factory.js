module.exports = function($http){
    return {
        savePictures: savePictures
    };

    function savePictures(body){
            return $http.post('api/photos', body);
    }
};