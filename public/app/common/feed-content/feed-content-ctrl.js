module.exports = function($scope, feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    vm.countLikes = countLikes;
    vm.countComments = countComments;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    //---Variables---
    $scope.statuses = feedFactory.statuses;
    vm.commentBox = [];

    activate();

    function activate() {
        feedFactory.getStatuses();
    }

    function formatStatusTime(unix) {
        return feedFactory.formatStatusTime(unix);
    }

    function countLikes(index){
        return $scope.statuses.statuses[index].likes.length;
    }

    function countComments(index){
        return $scope.statuses.statuses[index].comments.length;
    }

    function likeStatus(statusId, index) {
        var obj = {
            statusId: statusId
        };
        feedFactory.postLike(obj)
            .success(function(statusData){
                updateStatusSuccess(statusData, index);
            })
            .error(updateStatusError);

    }

    function commentOnStatus(statusId, index) {
        var obj = {
            statusId: statusId,
            comment: $scope.statuses.commentBoxArray[index]
        };

        $scope.statuses.commentBoxArray[index] = '';

        feedFactory.postComment(obj)
            .success(function(statusData){
                updateStatusSuccess(statusData, index);
            })
            .error(updateStatusError);
    }

    function updateStatusSuccess(statusData, index){
        $scope.statuses.statuses[index] = statusData;
    }

    function updateStatusError(err){
        console.log('Like status error');
    }
};