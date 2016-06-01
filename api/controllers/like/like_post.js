var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var request, result, userId;

module.exports.controller = function(app){
    app.post('/api/like', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, hasUserLiked);
    });

    function hasUserLiked(userId, err){
        if(err === false && userId != null){
            this.userId = userId;
            Statuses.hasUserLiked(request.body.statusId, userId, saveLike);
        }
        else{
            result.sendStatus(500);
        }
    }

    function saveLike(obj, err){
        if(err === false && obj.length === 0){
            Statuses.saveLike(request.body.statusId, this.userId, getStatusInfo);
        }
        else if(err === false && obj.length !== 0) {
            Statuses.removeLike(request.body.statusId, this.userId, getStatusInfo);
        }
        else{
            result.sendStatus(500);
        }
    }

    function getStatusInfo(status, err){
        if(!err){
            var statuses = [];
            statuses.push(status);
            Statuses.getStatusesUserInfo(statuses, finishPost);
        }
        else{
            result.sendStatus(500);
        }
    }

    function finishPost(status, err){
        if(!err){
            result.setHeader('Content-Type', 'application/json');
            result.send(JSON.stringify(HelperFuncs.sortByDate(status)[0]));
        }
        else{
            result.sendStatus(500);
        }
    }
};