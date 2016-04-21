//var newsFeed = require('../news-feed/news-feed.html');
module.exports = function($scope) {

    $scope.newsFeedHtml = './app/news-feed/news-feed.html';

    $scope.nws = [{
        name: 'Nick Plutt',
        status: 'Hello World!',
        time: '32 min'
    }];
};