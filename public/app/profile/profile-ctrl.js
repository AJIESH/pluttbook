module.exports = function(headerFactory) {
    var vm = this;
    //---Functions---

    //---Variables---
    vm.header = './app/common/header/header.html';
    vm.createStatus = './app/common/create-status/create-status.html';
    vm.feedContent = './app/common/feed-content/feed-content.html';
    vm.userInfo = null;

    activate();

    function activate(){
        getUserInfo();
    }

    function getUserInfo(){
        headerFactory.getUserInfo().then(function(data){
            vm.userInfo = data.data;
        });
    }
};