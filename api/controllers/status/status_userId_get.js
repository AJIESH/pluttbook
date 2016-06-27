var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var async = require('async');

module.exports.controller = function(app){
    app.get('/api/status/:userid', app.oauth.authorise(), function(request, result){

        var userId = request.params.userid;

        var offset = 0;
        var count = 25;

        if(request.query.offset !== null && request.query.offset !== undefined){
            offset = request.query.offset;
        }
        if(request.query.count !== null && request.query.count !== undefined){
            count = request.query.count;
        }

        //Gets passed in users id statuses
        getStatus(userId, false);

        function getStatus(id, err){
            if(id !== null && err === false){
                Statuses.getStatuses(id, getStatusesInfo)
            }
            else{
                result.sendStatus(500);
            }
        }

        function getStatusesInfo(statuses, err){
            if(!err){
                Statuses.getStatusesUserInfo(statuses, finishGet);
            }
            else{
                result.sendStatus(500);
            }
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

