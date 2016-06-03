module.exports = function($mdDialog, $mdMenu, headerFactory, currentUserDataFactory) {
    var vm = this;
    //---Functions---
    vm.goToNewsFeed = goToNewsFeed;
    vm.toggleSearch = toggleSearch;
    vm.querySearch = querySearch;
    vm.logout = logout;
    vm.goToProfile = goToProfile;
    vm.closeMenu = closeMenu;
    //---Variables---
    vm.logo = './app/common/logo/logo.html';
    vm.showSearch = false;
    vm.userInfo = null;
    vm.query = '';

    activate();

    function activate(){
        getUserInfo();
    }

    function getUserInfo(){
        currentUserDataFactory.getUserInfo()
            .success(function(data) {
                vm.userInfo = data;
                currentUserDataFactory.setUserInfoObject(data);
            })
            .error(function(data){
                console.log('Error retrieving user data.');
            });
    }

    function goToNewsFeed(){
        headerFactory.goToNewsFeed();
    }

    function toggleSearch(){
        vm.showSearch = !vm.showSearch;
        vm.query = '';
    }

    function querySearch(query){
        return headerFactory.search(query).then(function(data){
            return data.data;
        });
    }

    function logout(){
        headerFactory.logout();
    }

    function goToProfile(userId){
        if(userId){
            headerFactory.goToProfile(userId);
        }
        else{
            headerFactory.goToProfile(vm.userInfo.userId);
        }
    }

    function closeMenu(){
        $mdMenu.hide();
    }
};