module.exports = function($scope, feedFactory) {
    var vm = this;
    //---Functions---]
    vm.getProfilePictures = getProfilePictures;
    vm.formatStatusTime = formatStatusTime;
    vm.countLikes = countLikes;
    vm.countComments = countComments;
    vm.likeStatus = likeStatus;
    vm.commentOnStatus = commentOnStatus;
    vm.goToProfile = goToProfile;
    vm.numberOfCommentsToShow = numberOfCommentsToShow;
    vm.hideCommentsButton = hideCommentsButton;
    vm.hideHideCommentsButton = hideHideCommentsButton;
    vm.toggleComments = toggleComments;
    //---Variables---
    $scope.statuses = feedFactory.statuses;
    vm.commentBox = [];
    vm.profilePictures = null;

    activate();

    function activate() {
        feedFactory.deferNewProfilePictures();
        feedFactory.getStatuses();
        getProfilePictures();
    }

    function getProfilePictures(){
        feedFactory.getNewProfilePictures().then(function(data){
            vm.profilePictures = data;
        });

    }

    function formatStatusTime(unix) {
        return feedFactory.formatStatusTime(unix);
    }

    function countLikes(index){
        if($scope.statuses.statuses[index].hasOwnProperty('likes')){
            return $scope.statuses.statuses[index].likes.length;
        }
        else{
            return 0;
        }
    }

    function countComments(index){
        if($scope.statuses.statuses[index].hasOwnProperty('comments')){
            return $scope.statuses.statuses[index].comments.length;
        }
        else{
            return 0;
        }
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

    function goToProfile(userInfo){
        feedFactory.goToProfile(userInfo.userId);
    }

    function numberOfCommentsToShow(index){
        if($scope.statuses.statuses[index].hasOwnProperty('comments')){
            return $scope.statuses.statuses[index].comments.length - 3;
        }
    }

    function hideCommentsButton(index){
        if($scope.statuses.statuses[index].hasOwnProperty('comments')){
            return $scope.statuses.statuses[index].comments.length <= 3 || !$scope.statuses.statuses[index].comments[0].hideComment;
        }
    }

    function hideHideCommentsButton(index){
        if($scope.statuses.statuses[index].hasOwnProperty('comments')){
            return $scope.statuses.statuses[index].comments.length <= 3 || $scope.statuses.statuses[index].comments[0].hideComment;
        }
    }

    function toggleComments(index){
        if($scope.statuses.statuses[index].hasOwnProperty('comments')) {
            if(!$scope.statuses.statuses[index].comments[0].hideComment){
                //Hide comments
                for(var i=0; i<$scope.statuses.statuses[index].comments.length-3; i++){
                    $scope.statuses.statuses[index].comments[i].hideComment = true;
                }
            }
            else{
                for(var i=0; i<$scope.statuses.statuses[index].comments.length; i++){
                    $scope.statuses.statuses[index].comments[i].hideComment = false;
                }
            }
        }

    }
};