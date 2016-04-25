module.exports = function($scope) {

    $scope.newsFeedHtml = './app/news-feed/news-feed.html';
    $scope.searchBar = './app/search-bar/search-bar.html';
    $scope.logo = './app/logo/logo.html';

    $scope.nws = [{
        name: 'Nick Plutt',
        status: 'Hello World!',
        time: '32 min'
    }];

    $scope.search = function(){
        console.log('Search');
    }
};