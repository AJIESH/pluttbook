module.exports = function($scope, profileFactory, currentUserDataFactory, $routeParams) {
    var vm = this;
    //---Functions---
    vm.addFriend = addFriend;
    vm.isUserFriend = isUserFriend;
    //---Variables---
    vm.header = './app/common/header/header.html';
    vm.createStatus = './app/common/create-status/create-status.html';
    vm.feedContent = './app/common/feed-content/feed-content.html';
    vm.userInfo = null;
    vm.routeUserId = $routeParams.userid;
    vm.isMyProfile = false;
    vm.isFriend = false;

    activate();

    function activate() {
        getMyInfo();
        getUserInfo();
        isUserFriend();
    }

    function getMyInfo() {
        currentUserDataFactory.getUserInfoObject().then(function (data) {
            vm.isMyProfile = (vm.routeUserId === data.userId);
        });
    }

    function getUserInfo() {
        profileFactory.getUserInfo().then(function (data) {
            vm.userInfo = data.data;
        });
    }

    function isUserFriend(){
        profileFactory.isUserFriend()
            .success(function(data){
                vm.isFriend = data;
            })
            .error(function(data){
                console.log('Error isUserFriend');
            });
    }

    function addFriend() {
        profileFactory.addFriend()
            .success(function(data){
                vm.isFriend = !vm.isFriend;
            })
            .error(function(data){
                console.log('Error addFriend');
            })
    }
};