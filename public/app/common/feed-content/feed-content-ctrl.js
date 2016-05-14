module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.countLikes = countLikes;
    vm.countComments = countComments;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    //---Variables---
    vm.news = null;
    vm.commentBox = [];

    activate();

    function activate() {
        feedFactory.getStatuses();
        getStatuses();
    }

    function getStatuses() {
        feedFactory.setStatusPromise().then(function (data) {
            vm.news = data.data;
            createBlankCommentBoxArray();
            getStatuses();
        });
    }

    function formatStatusTime(unix) {
        return feedFactory.formatStatusTime(unix);
    }

    function countLikes(index){
        return vm.news[index].likes.length;
    }

    function countComments(index){
        return vm.news[index].comments.length;
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

    }

    function commentOnStatus(index) {
        var obj = {
            statusId: vm.news[index]._id,
            comment: vm.commentBox[index]
        };

        vm.commentBox[index] = '';

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

    function createBlankCommentBoxArray(){
        for(var i=0; i<vm.news.length; i++){
            vm.commentBox.push('');
        }
    }
};