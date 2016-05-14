var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');
var HelperFuncs = require('../common/helperFunctions.js');
var async = require('async');

var request, result;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(!validPost()){
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

    app.get('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, getStatus);

        function getStatus(id, err){
            if(id !== null && err === false){
                Statuses.getStatuses(id, finishGet)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(statuses, err){
            if(!err){
                var sortedStatuses = sortByDate(statuses);
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(sortedStatuses));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};
function validPost(){
    return request.body.status !== null;
}

function sortByDate(statuses){
    for(var i=0; i<statuses.length; i++){
        statuses[i].comments = HelperFuncs.quickSort(statuses[i].comments, commentSort);
    }
   return HelperFuncs.quickSort(statuses, statusSort);
}

function statusSort(a, b){
    return a.dateTime > b.dateTime;
}

function commentSort(a, b){
    return a.dateTime < b.dateTime;
}