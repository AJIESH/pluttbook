var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var async = require('async');

module.exports.controller = function(app){
    app.get('/api/status/:userid', app.oauth.authorise(), function(request, result){

        var userId = request.params.userid;

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
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(HelperFuncs.sortByDate(statuses)));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};

