module.exports = function(mdPanelRef, userInfo, index, availableUsersFactory, chatWindowFactory, $timeout, currentUserDataFactory){
    vm = this;
    //---Functions---
    vm.activate = activate;
    vm.getMessagesLoop = getMessagesLoop;
    vm.close = close;
    vm.getName = getName;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;
    vm.isCurrentUser = isCurrentUser;
    //---Variables---
    vm.messageText = '';
    vm.messages = null;
    vm.currentUserInfo = null;

    activate();

    function activate(){
        currentUserDataFactory.getUserInfoObject().then(function(data){
            vm.currentUserInfo = data;
            getMessagesLoop();
        });
    }

    function getMessagesLoop(){
        getMessages();

        $timeout(function(){
            getMessagesLoop();
        }, 5000);
    }

    function close(){
        availableUsersFactory.getSetIndex(index);
        mdPanelRef.close();
    }

    function getName(){
        return userInfo.firstName + ' ' + userInfo.lastName;
    }

    function sendMessage(text){
        chatWindowFactory.sendMessage(text, userInfo.userId)
            .success(function(data){
                vm.messageText = '';
                getMessages();
            })
            .error(function(data){
                console.log('Error sending message')
            });
    }

    function getMessages(){
        chatWindowFactory.getMessages(userInfo.userId, 50, 0)
            .success(function(data){
                vm.messages = data;
            })
            .error(function(data){
                console.log('Error retrieving messages');
            })
    }

    function isCurrentUser(message){
        return message.senderId === vm.currentUserInfo.userId;
    }
};