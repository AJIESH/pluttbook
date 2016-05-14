var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');
var HelperFuncs = require('../common/helperFunctions');

var request, result, userId;

module.exports.controller = function(app){
    app.post('/api/comment', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, saveComment);
    });

    function saveComment(userId, err){
        if(err === false && userId != null){
            var date = HelperFuncs.getUnixTime();
            Statuses.saveComment(request.body.statusId, request.body.comment, date, userId, finishPost);
        }
        else{
            result.sendStatus(500);
        }
    }

    function finishPost(status, err){
        if(!err){
            status.comments = HelperFuncs.quickSort(status.comments, commentSort);
            result.setHeader('Content-Type', 'application/json');
            result.send(JSON.stringify(status));
        }
        else{
            result.sendStatus(500);
        }
    }
};

function commentSort(a, b){
    return a.dateTime < b.dateTime;
}