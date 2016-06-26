var chatWindowCtrl = require('../chat-window/chat-window-ctrl.js');

module.exports = function($timeout, $mdPanel, $q, availableUsersFactory) {
    var vm = this;
    //---Functions---
    vm.addChatWindow = addChatWindow;
    //---Variables---
    vm.availableFriends = null;
    vm.panelRef = undefined;
    vm.right = '225px';
    vm.numberWindowsOpen = 0;
    vm.chatWindowUserId = '';

    activate();

    function activate(){
        getAvailableFriendsAndNotifications();
        getChatWindowData();
    }

    function getAvailableFriendsAndNotifications(){
        $q.all([availableUsersFactory.getAvailableFriends(), availableUsersFactory.getNotifications()]).then(function(data){
            vm.availableFriends = data[0].data;
            var notifications = data[1].data;

            for(var i=0; i<vm.availableFriends.length; i++){
                vm.availableFriends[i].newMessages = userHasNotifications(vm.availableFriends[i].userId, notifications);
            }
        });

        $timeout(function(){
            getAvailableFriendsAndNotifications();
        }, 15000);
    }

    function getChatWindowData(){
        var chatWindowData = availableUsersFactory.getChatWindowData();
        vm.numberWindowsOpen = chatWindowData.numberWindowsOpen;
        vm.chatWindowUserId = chatWindowData.userId;
    }

    function addChatWindow(userInfo){
        vm.chatWindowUserId = userInfo.userId;

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
        setMessagesToRead();
        availableUsersFactory.setChatWindowData(vm.numberWindowsOpen, '');
        var chatWindows = angular.element($('.chat-window'));
        var index = availableUsersFactory.getSetIndex();
        for(var i=index+1; i<chatWindows.length; i++){
            var req = $(chatWindows[i]);
            req.css('right', (225 + (i-1) * 260).toString() + 'px');
        }
    }

    function openChatWindow(){
        vm.numberWindowsOpen ++;
        availableUsersFactory.setChatWindowData(vm.numberWindowsOpen, vm.chatWindowUserId);
        setOffSet();
        setMessagesToRead();
    }

    function setOffSet(){
        vm.right = (225 + vm.numberWindowsOpen * 260).toString() + 'px';
    }

    function setMessagesToRead(){
        availableUsersFactory.setMessagesToRead(vm.chatWindowUserId)
            .success(function(data){
                for(var i=0; i<vm.availableFriends.length; i++){
                    if(vm.availableFriends[i].userId === vm.chatWindowUserId){
                        vm.availableFriends[i].newMessages = false;
                        break;
                    }
                }
            })
            .error(function(data){
                console.log('Error setting messages read to true')
            })
    }

    function userHasNotifications(userId, notificatons){
        var hasNotification = false;
        for(var i=0; i<notificatons.length; i++){
            if(notificatons[i].fromUserId === userId){
                hasNotification = true;
                break;
            }
        }
        return hasNotification;
    }
};