module.exports = function(mdPanelRef, userInfo, index, availableUsersFactory){
    vm = this;
    //---Functions---
    vm.close = close;
    vm.getName = getName;
    vm.sendMessage = sendMessage;
    //---Variables---
    vm.messageText = '';

    function close(){
        availableUsersFactory.getSetIndex(index);
        mdPanelRef.close();
    }

    function getName(){
        return userInfo.firstName + ' ' + userInfo.lastName;
    }

    function sendMessage(text){
        vm.messageText = text;
    }
};