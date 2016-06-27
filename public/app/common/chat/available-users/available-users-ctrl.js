var chatWindowCtrl = require('../chat-window/chat-window-ctrl.js');

module.exports = function($rootScope, $timeout, $mdPanel, $q, availableUsersFactory) {
    var vm = this;
    //---Functions---
    vm.activate = activate;
    vm.getAvailableFriendsAndNotifications = getAvailableFriendsAndNotifications;
    vm.getChatWindowData = getChatWindowData;
    vm.addChatWindow = addChatWindow;
    vm.removeChatWindow = removeChatWindow;
    vm.openChatWindow = openChatWindow;
    vm.setMessagesToRead = setMessagesToRead;
    vm.userHasNotifications = userHasNotifications;
    vm.getNumberWindowsOpen = getNumberWindowsOpen;
    //---Variables---
    vm.availableFriends = null;
    vm.panelRef = undefined;
    vm.right = '225px';
    vm.numberWindowsOpen = 0;
    vm.chatWindowUserId = '';
    vm.continueLoop = true;

    activate();

    function activate(){
        getAvailableFriendsAndNotifications();
        getChatWindowData();
    }

    function getAvailableFriendsAndNotifications(){
        if(vm.continueLoop){
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
        vm.numberWindowsOpen = 0;
        setMessagesToRead();
        availableUsersFactory.setChatWindowData(vm.numberWindowsOpen, '');
        getChatWindowData();
    }

    function openChatWindow(){
        vm.numberWindowsOpen ++;
        availableUsersFactory.setChatWindowData(vm.numberWindowsOpen, vm.chatWindowUserId);
        setMessagesToRead();
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
            if(notificatons[i].fromUserId === userId && notificatons[i].fromUserId !== vm.chatWindowUserId){
                hasNotification = true;
                break;
            }
        }
        return hasNotification;
    }

    function getNumberWindowsOpen(){
        var chatWindowData = availableUsersFactory.getChatWindowData();
        return chatWindowData.numberWindowsOpen;
    }

    $rootScope.$on('stop-loops', function(){
        vm.continueLoop = false;
    });
};