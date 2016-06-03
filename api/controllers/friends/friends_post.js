var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');

var userId, addFriend;

module.exports.controller = function(app){
    app.post('/api/friends', app.oauth.authorise(), function(request, result){

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
};