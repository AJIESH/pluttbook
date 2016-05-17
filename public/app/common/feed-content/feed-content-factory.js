module.exports = function($http, $q){
    var statuses = {
        statuses: null,
        commentBoxArray: []
    };

    return {
        getStatuses: getStatuses,
        postLike: postLike,
        postComment: postComment,
        formatStatusTime: formatStatusTime,
        statuses: statuses
    };

    function getStatuses() {
         $http.get('api/status').then(function(data){
             statuses.statuses = data.data;
             createBlankCommentBoxArray();
         });
    }

    function postLike(statusId){
        return $http.post('api/like', statusId);
    }

    function postComment(comment){
        return $http.post('api/comment', comment);
    }

    function formatStatusTime(unix){
        var currentTime = new Date();
        currentTime = Date.parse(currentTime)/1000;
        var difference = currentTime - unix;
        //Converts to minutes if less than 60
        if(Math.floor(difference / 60) < 60){
            return Math.floor(difference / 60).toString() + ' mins';
        }
        else if(Math.floor(difference / 3600) < 24){
            return Math.floor(difference / 3600).toString() + ' hrs';
        }
        else if(Math.floor(difference / 86400)< 7){
            return Math.floor(difference / 86400) + ' days';
        }
    }

    function createBlankCommentBoxArray(){
        for(var i=0; i<statuses.statuses.length; i++){
            statuses.commentBoxArray.push('');
        }
    }
};