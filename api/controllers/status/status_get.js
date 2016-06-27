var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var Friends = require('../../dbFunctions/Friends.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var async = require('async');

module.exports.controller = function(app){
    app.get('/api/status', app.oauth.authorise(), function(request, result){

        var offset = 0;
        var count = 25;

        if(request.query.offset !== null && request.query.offset !== undefined){
            offset = request.query.offset;
        }
        if(request.query.count !== null && request.query.count !== undefined){
            count = request.query.count;
        }

        //Gets get user's network's statuses
        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(userId !== null && err === false){
                Friends.getFriends(userId, getStatuses);
            }
            else{
                result.sendStatus(500);
            }
        }

        function getStatuses(friends, err){
            if(err === false && friends.length === 1){
                async.map(friends[0].friends, Statuses.getStatusesAsync, function(err, res){
                    (!err) ? getUsersInfo(HelperFuncs.concatArrays(res)) : result.sendStatus(500);
                });
            }
            else{
                result.sendStatus(500);
            }
        }

        function getUsersInfo(statuses){
            Statuses.getStatusesUserInfo(statuses, finishGet);
        }

        function finishGet(statuses, err){
            if(!err){
                var sortedStatuses = HelperFuncs.sortByDate(statuses);
                sortedStatuses = HelperFuncs.pageArray(sortedStatuses, count, offset);
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(sortedStatuses));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};

