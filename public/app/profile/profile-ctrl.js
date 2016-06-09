var editPicturesCtrl = require('./edit-pictures-ctrl.js');

module.exports = function($scope, profileFactory, currentUserDataFactory, $routeParams, $mdPanel) {
    var vm = this;
    //---Functions---
    vm.addFriend = addFriend;
    vm.isUserFriend = isUserFriend;
    vm.showPanel = showPanel;
    //---Variables---
    vm.header = './app/common/header/header.html';
    vm.createStatus = './app/common/create-status/create-status.html';
    vm.feedContent = './app/common/feed-content/feed-content.html';
    vm.friendsList = './app/common/friends-list/friends-list.html';
    vm.userInfo = null;
    vm.routeUserId = $routeParams.userid;
    vm.isMyProfile = false;
    vm.isFriend = false;
    vm.mdPanel = $mdPanel;

    activate();

    function activate() {
        getMyInfo();
        getUserInfo();
        isUserFriend();
    }

    function getMyInfo() {
        profileFactory.getCurrentUserInfo()
            .success(function(data){
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

    function showPanel(){
        var position = vm.mdPanel.newPanelPosition()
            .absolute()
            .center()
            .centerHorizontally();

        var config = {
            attachTo: angular.element(document.body),
            controller: editPicturesCtrl,
            controllerAs: 'vm',
            disableParentScroll: this.disableParentScroll,
            templateUrl: './app/profile/edit-pictures.html',
            hasBackdrop: true,
            panelClass: 'edit-pictures',
            position: position,
            trapFocus: true,
            zIndex: 150,
            focusOnOpen: true
        };

        this.mdPanel.open(config);
    }
};