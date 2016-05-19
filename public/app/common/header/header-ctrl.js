module.exports = function($mdDialog, $mdMenu, headerFactory, currentUserDataFactory) {
    var vm = this;
    //---Functions---
    vm.goToNewsFeed = goToNewsFeed;
    vm.toggleSearch = toggleSearch;
    vm.logout = logout;
    vm.goToProfile = goToProfile;
    vm.closeMenu = closeMenu;
    //---Variables---
    vm.logo = './app/common/logo/logo.html';
    vm.showSearch = false;
    vm.userInfo = null;

    activate();

    function activate(){
        getUserInfo();
    }

    function getUserInfo(){
        currentUserDataFactory.getUserInfo();
        currentUserDataFactory.getUserObject().then(function(data){
            vm.userInfo = data;
        });
    }

    function goToNewsFeed(){
        headerFactory.goToNewsFeed();
    }

    function toggleSearch(){
        vm.showSearch = vm.showSearch ? false : true;
    }

    function logout(){
        headerFactory.logout();
    }

    function goToProfile(){
        headerFactory.goToProfile(vm.userInfo.userId);
    }

    function closeMenu(){
        $mdMenu.hide();
    }
};