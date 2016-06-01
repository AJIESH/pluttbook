var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var Friends = require('../../dbFunctions/Friends.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var async = require('async');

var request, result;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(request, result){

        if(request.body.status === null){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, saveStatus);

        function saveStatus(userId, err){
            if(err === false && userId !== null){
                var status = request.body.status;
                var date = HelperFuncs.getUnixTime();

                Statuses.saveStatus(userId, status, date, finishPost);
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishPost(err){
            (!err) ? result.sendStatus(200) : result.sendStatus(500);
        }
    });
};

