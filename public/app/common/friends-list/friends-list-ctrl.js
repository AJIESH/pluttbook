module.exports = function(friendsListFactory, feedFactory) {
    var vm = this;
    //---Functions---
    vm.getFriends = getFriends;
    vm.countFriends = countFriends;
    vm.goToProfile = goToProfile;
    //---Variables---
    vm.friends = null;

    activate();

    function activate(){
        getFriends();
    }

    function getFriends(){
        friendsListFactory.getFriends()
            .success(function(data){
                vm.friends = data;
            })
            .error(function(data){
                console.log('Error retrieving users friends');
            });
    }

    function countFriends(){
        if(vm.friends){
            return vm.friends.length;
        }
    }

    function goToProfile(userInfo){
        feedFactory.goToProfile(userInfo.userId);
    }
};