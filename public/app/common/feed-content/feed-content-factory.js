module.exports = function($http, $q){
    var statuses = $q.defer();

    return {
        getStatuses: getStatuses,
        getStatus: getStatus,
        formatStatusTime: formatStatusTime
    };

    function getStatuses() {
         $http.get('api/status').then(function(data){
             statuses.resolve(data);
             statuses = $q.defer();
         });
    }

    function getStatus(){
       return statuses.promise;
    }

    function formatStatusTime(unix){
        var currentTime = new Date();
        currentTime = Date.parse(currentTime)/1000;
        var difference = currentTime - unix;
        //Converts to minutes if less than 60
        if(Math.floor(difference / 60) < 60){
            console.log(currentTime + ' ' + unix);
            return Math.floor(difference / 60).toString() + ' mins';
        }
        else if(Math.floor(difference / 3600) < 24){
            return Math.floor(difference / 3600).toString() + ' hrs';
        }
        else if(Math.floor(difference / 86400)< 7){
            return Math.floor(difference / 86400) + ' days';
        }
    }
};