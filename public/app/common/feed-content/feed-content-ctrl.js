module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    //---Variables---

    activate();

    function activate() {
        feedFactory.getStatuses();
        getStatuses();
    }

    function getStatuses() {
        feedFactory.setStatusPromise().then(function (data) {
            vm.news = data.data;
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
        for(var i=0; i<vm.news.length; i++){
            if(vm.news[i]._id === statusData._id){
                vm.news[i] = statusData;
            }
        }
        feedFactory.setStatusDefer();
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