module.exports = function($scope, $controller) {

    $scope.newsFeedHtml = './app/news-feed/news-feed.html';
    $scope.searchBar = './app/search-bar/search-bar.html';
    $scope.logo = './app/logo/logo.html';

    $scope.nws = [{
        name: 'Nick Plutt',
        status: 'Hello World!',
        time: '32 min'
    }];
};