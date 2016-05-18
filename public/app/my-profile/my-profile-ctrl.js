module.exports = function(profileFactory, headerFactory, $routeParams) {
    var vm = this;
    //---Functions---

    //---Variables---
    vm.header = './app/common/header/header.html';
    vm.createStatus = './app/common/create-status/create-status.html';
    vm.feedContent = './app/common/feed-content/feed-content.html';
    vm.userInfo = null;
    vm.routeUserId = $routeParams.userid;
    vm.isMyProfile = false;

    activate();

    function activate(){
        getMyInfo();
    }

    function getMyInfo(){
        headerFactory.getUserObject().then(function(data){
            vm.isMyProfile = vm.routeUserId === data.userId;
        });
    }

    //function getUserInfo(){
    //    profileFactory.getUserInfo().then(function(data){
    //        vm.userInfo = data
    //    })
    //}
};