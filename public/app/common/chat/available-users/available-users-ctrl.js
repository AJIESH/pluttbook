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
            .bottom('5px');

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
            locals: {userInfo: userInfo, index: vm.numberWindowsOpen},
            onRemoving: removeChatWindow,
            onOpenComplete: openChatWindow
        };

        $mdPanel.open(config);
    }

    //Todo: after each panel added increment css right, and after each panel that is removed, use jquery to set the css to move the panels to the right

    function removeChatWindow(){
        vm.numberWindowsOpen --;
        setOffSet();
        var chatWindows = angular.element($('.chat-window'));
        var index = availableUsersFactory.getSetIndex();
        for(var i=index+1; i<chatWindows.length; i++){
            var req = $(chatWindows[i]);
            req.css('right', (225 + (i-1) * 260).toString() + 'px');
        }
    }

    function openChatWindow(){
        vm.numberWindowsOpen ++;
        setOffSet();
    }

    function setOffSet(){
        vm.right = (225 + vm.numberWindowsOpen * 260).toString() + 'px';
    }
};