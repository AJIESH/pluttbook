var chatWindowCtrl = require('../chat-window/chat-window-ctrl.js');

module.exports = function($timeout, $mdPanel, availableUsersFactory) {
    var vm = this;
    //---Functions---
    vm.addChatWindow = addChatWindow;
    //---Variables---
    vm.availableFriends = null;
    vm.panelRef = undefined;
    vm.right = '225px';
    vm.numberWindowsOpen = 0;

    activate();

    function activate(){
        getAvailableFriends();
    }

    function getAvailableFriends(){
        availableUsersFactory.getAvailableFriends()
           .success(function(data){
                vm.availableFriends = data;
           })
           .error(function(){
               console.log('Error retrieving available friends');
           });

        $timeout(function(){
            getAvailableFriends();
        }, 60000);
    }

    function addChatWindow(userInfo){
        var position = $mdPanel.newPanelPosition()
            .right(vm.right)
            .bottom('0px');

        var config = {
            attachTo: angular.element(document.body),
            controller: chatWindowCtrl,
            controllerAs: 'vm',
            templateUrl: './app/common/chat/chat-window/chat-window.html',
            hasBackdrop: true,
            panelClass: 'chat-window',
            position: position,
            trapFocus: true,
            zIndex: 150,
            focusOnOpen: true,
            locals: {userInfo: userInfo},
            onRemoving: removeChatWindow,
            onOpenComplete: openChatWindow
        };

        $mdPanel.open(config);
    }

    //Todo: after each panel added increment css right, and after each panel that is removed, use jquery to set the css to move the panels to the right

    function removeChatWindow(){
        vm.numberWindowsOpen --;
        var offset = 225 + vm.numberWindowsOpen * 260;
        vm.right = '600px';
    }

    function openChatWindow(){
        vm.numberWindowsOpen ++;
    }

    function getOffSet(){
        return 225 + vm.numberWindowsOpen * 260;
    }
};