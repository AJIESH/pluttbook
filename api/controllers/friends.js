var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Friends = require('../dbFunctions/Friends.js');

var request, result, userId, addFriend;

module.exports.controller = function(app){
    app.post('/api/friends', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, isUserFriend);

        function isUserFriend(userId, err){
            if(err === false && userId != null && userId !== request.body.friendId){
                this.userId = userId;
                Friends.isUserFriend(request.body.friendId, userId, saveAsFriendIdFriend);
            }
            else{
                result.sendStatus(500);
            }
        }

        function saveAsFriendIdFriend(obj, err){
            if(err === false && obj.length === 0){
                addFriend = true;
                Friends.saveFriend(this.userId, request.body.friendId, saveAsUserIdFriend);
            }
            else if(err === false && obj.length !== 0) {
                addFriend = false;
                Friends.removeFriend(this.userId, request.body.friendId, saveAsUserIdFriend)
            }
            else{
                result.sendStatus(500);
            }
        }

        function saveAsUserIdFriend(friends, err){
            if(err === false && addFriend === true){
                Friends.saveFriend(request.body.friendId, this.userId, finishPost);
            }
            else if(err === false && addFriend === false){
                Friends.removeFriend(request.body.friendId, this.userId, finishPost);
            }
        }

        function finishPost(friends, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(friends));
            }
            else{
                result.sendStatus(500);
            }
        }
    });

    app.get('/api/friends', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(req.query.hasOwnProperty('userid')){
            //Gets passed in users id statuses
            //getStatus(req.query.userid, false);
        }
        else{
            //Gets current user's statuses
            OAuthTokens.getTokensUserId(request, result, getFriends);
        }

        //Todo: Check if user has permission to access user's friends

        function getFriends(userId, err){
            if(userId !== null && err === false){
                Friends.getFriends(userId, finishGet)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(friends, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(friends));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};