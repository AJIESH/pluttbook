module.exports = function($scope) {
    $scope.showSearch = false;

    $scope.toggleSearch = function(){
        $scope.showSearch = $scope.showSearch ? false : true;
    }
};