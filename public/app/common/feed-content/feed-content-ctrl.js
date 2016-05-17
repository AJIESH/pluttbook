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
            statusId: $scope.statuses.statuses[index]._id,
            comment: $scope.statuses.commentBoxArray[index]
        };

        $scope.statuses.commentBoxArray[index] = '';

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
        $scope.statuses.statuses[index] = statusData;
    }

    function updateStatusError(err){
        console.log('Like status error');
    }
};