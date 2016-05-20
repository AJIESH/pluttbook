var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');
var Friends = require('../dbFunctions/Friends.js');
var HelperFuncs = require('../common/helperFunctions.js');
var async = require('async');

var request, result;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

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

    app.get('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(req.query.hasOwnProperty('userid')){
            //Gets passed in users id statuses
            getStatus(req.query.userid, false);

            //Todo: Check if user has permission to access user's status

            function getStatus(id, err){
                if(id !== null && err === false){
                    Statuses.getStatuses(id, finishGet)
                }
                else{
                    result.sendStatus(500);
                }
            }
        }
        else{
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
                    async.map(friends[0].friends, Statuses.getStatusesAsync, function(err, result){
                        finishGet(concatArrays(result));
                    });
                }
                else{
                    result.sendStatus(500);
                }
            }

            function concatArrays(statuses){
                var concated = [];
                for(var i=0; i<statuses.length; i++){
                    concated = concated.concat(statuses[i]);
                }
                return concated;
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