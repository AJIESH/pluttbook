module.exports = function(chatFactory) {
    var vm = this;
    //---Functions---

    //---Variables---
    vm.availableFriends = null;

    activate();

    function activate(){
        getAvailableFriends();
    }

    function getAvailableFriends(){
       chatFactory.getAvailableFriends()
           .success(function(data){
                vm.availableFriends = data;
           })
           .error(function(){
               console.log('Error retrieving available friends');
           })
    }

};