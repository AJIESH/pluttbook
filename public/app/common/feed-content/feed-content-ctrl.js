module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.countLikes = countLikes;
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
            vm.news = data.data;
            getStatuses();
        });
    }

    function formatStatusTime(unix) {
        return feedFactory.formatStatusTime(unix);
    }

    function countLikes(index){
        return vm.news[index].likes.length;
    }

    function likeStatus(statusId, index) {
        var obj = {
            statusId: statusId
        };
        feedFactory.postLike(obj).then(function(data){
            if(data.status === 200){
                updateStatusSuccess(data.data, index);
            }
            else{
                updateStatusError(data);
            }
        });

    };

    function commentOnStatus(statusId, comment, index) {
        var obj = {
            statusId: statusId,
            comment: comment
        };
        feedFactory.postComment(obj).then(function(data){
            if(data.status === 200){
                updateStatusSuccess(data.data, index);
            }
            else{
                updateStatusError(data);
            }
        });
    }

    function updateStatusSuccess(statusData, index){
        vm.news[index] = statusData;
    }

    function updateStatusError(err){
        console.log('Like status error');
    }
};