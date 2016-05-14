module.exports = function($mdDialog, $mdMenu, headerFactory) {
    var vm = this;
    //---Functions---
    vm.toggleSearch = toggleSearch;
    vm.logout = logout;
    vm.closeMenu = closeMenu;
    //---Variables---
    vm.logo = './app/common/logo/logo.html';
    vm.showSearch = false;
    vm.userInfo = null;

    activate();

    function activate() {
        getUserInfo();
    }

    function getUserInfo(){
        headerFactory.getUserInfo().then(function(data){
           vm.userInfo = data.data;
        });
    }

    function toggleSearch() {
        vm.showSearch = vm.showSearch ? false : true;
    };

    function logout() {
        headerFactory.logout();
    };

    function closeMenu(){
        $mdMenu.hide();
    }
};