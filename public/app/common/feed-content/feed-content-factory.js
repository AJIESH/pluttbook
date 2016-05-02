module.exports = function($http, $q){
    var statuses = $q.defer();

    return {
        getStatuses: getStatuses,
        getStatus: getStatus,
        setStatusesToDefered: setStatusesToDefered
    };

    function getStatuses() {
         $http.get('api/status').then(function(data){
             statuses.resolve(data);
         });
    }

    function getStatus(){
       return statuses.promise;
    }

    function setStatusesToDefered(){
        statuses = $q.defer();
    }
};