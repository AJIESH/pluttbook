module.exports = function($scope, $mdDialog) {

    $scope.newsFeedHtml = './app/news-feed/news-feed.html';
    $scope.searchBar = './app/search-bar/search-bar.html';
    $scope.logo = './app/logo/logo.html';

    $scope.showSearch = false;

    $scope.toggleSearch = function(){
        $scope.showSearch = $scope.showSearch ? false : true;
    }
};