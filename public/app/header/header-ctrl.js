module.exports = function($scope, $mdDialog, headerFactory) {

    $scope.logo = './app/logo/logo.html';

    $scope.showSearch = false;

    $scope.toggleSearch = function(){
        $scope.showSearch = $scope.showSearch ? false : true;
    };

    $scope.logout = function(){
        headerFactory.logout();
    };
};