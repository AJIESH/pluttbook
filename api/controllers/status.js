var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');
var Friends = require('../dbFunctions/Friends.js');
var UserInfo = require('../dbFunctions/UserInfo.js');
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
                        (!err) ? getUsersInfo(HelperFuncs.concatArrays(result)) : result.sendStatus(500);
                    });
                }
                else{
                    result.sendStatus(500);
                }
            }

            function getUsersInfo(statuses){
                var response = [];
                async.forEachOf(statuses, function(status, key, callback){
                    async.parallel([
                        function(callback) {
                            UserInfo.getUserInfoAsync(status, callback);
                        },
                        function(callback){
                            async.map(status.likes, UserInfo.getUserInfoAsync, function(err, result){
                                callback(null, result);
                            });
                        },
                        function(callback){
                            async.map(status.comments, UserInfo.getUserInfoAsync, function(err, result){
                                callback(null, result);
                            });
                        }
                    ],
                    function(err, results){
                        var newObject = {
                            userId: statuses[key].userId,
                            status: statuses[key].status,
                            dateTime: statuses[key].dateTime,
                            likes: [],
                            comments: [],
                            userInfo: null
                        };

                        async.parallel([
                           function(callback){
                               var o2 = {userInfo: results[0]};
                               newObject.userInfo = results[0];
                           },
                           function(callback){
                               var statusesLikesUsersInfo = results[1];
                               for(var i=0; i<status.likes.length; i++){
                                   newObject.likes.push({
                                       userId: statuses[key].likes[i].userId,
                                       userInfo: statusesLikesUsersInfo[i]
                                   });
                               }
                           },
                           function(callback){
                               var statusesCommentsUsersInfo = results[2];
                               for(var i=0; i<status.comments.length; i++){
                                   newObject.comments.push({
                                       userId: statuses[key].comments[i].userId,
                                       text: statuses[key].comments[i].text,
                                       dateTime: statuses[key].comments[i].dateTime,
                                       userInfo: statusesCommentsUsersInfo[i]
                                   });
                               }
                           }
                        ]);
                        response.push(newObject);
                        callback();
                    });
                }, function (err){
                    finishGet(response, err);
                });
            }

        }

        function finishGet(statuses, err){
            if(!err){
                var sortedStatuses = sortByDate(statuses);
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(statuses));
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