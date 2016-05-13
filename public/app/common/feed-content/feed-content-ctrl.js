module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    //---Variables---
    vm.news = null;

    activate();

    function activate() {
        feedFactory.getStatuses();
        getStatuses();
    }

    function getStatuses() {
        feedFactory.setStatusPromise().then(function (data) {
            vm.news = feedFactory.sortStatusesByDate(data.data);
            getStatuses();
        });
    }

    function formatStatusTime(unix) {
        return feedFactory.formatStatusTime(unix);
    }

    function likeStatus(statusId) {
        var obj = {
            statusId: statusId
        };
        feedFactory.postLike(obj)
            .success(likeStatusSuccess)
            .error(likeStatusError);
    }

    function likeStatusSuccess(statusData){
        //statusDictionary[statusData._id] = statusData;
        //statusDictionary
    }

    function likeStatusError(){
        console.log('Like status error');
    }

    function countLikes(newsIndex){
        return vm.news[newsIndex].comments.length;
    }

    function commentOnStatus(statusId, comment) {
        var obj = {
            statusId: statusId,
            comment: comment
        };
        feedFactory.postComment(obj);
    }
};