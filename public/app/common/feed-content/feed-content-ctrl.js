module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    //---Variables---

    activate();

    function formatStatusTime(unix){
        return feedFactory.formatStatusTime(unix);
    }

    function likeStatus(statusId){
        var obj = {
            statusId: statusId
        };
        feedFactory.postLike(obj);
    }

    function commentOnStatus(statusId, comment){
        var obj = {
            statusId: statusId,
            comment: comment
        };
        feedFactory.postComment(obj);
    }

    function activate(){
        feedFactory.getStatuses();
        getStatuses();
    }

    function getStatuses(){
        feedFactory.getStatus().then(function(data){
            vm.news = data.data;
            getStatuses();
        });
    }
};