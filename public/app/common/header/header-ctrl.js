module.exports = function($mdDialog, headerFactory) {
    var vm = this;
    //---Functions---
    vm.toggleSearch = toggleSearch;
    vm.logout = logout;
    //---Variables---
    vm.logo = './app/common/logo/logo.html';
    vm.showSearch = false;

    function toggleSearch() {
        vm.showSearch = vm.showSearch ? false : true;
    };

    function logout() {
        headerFactory.logout();
    };
};