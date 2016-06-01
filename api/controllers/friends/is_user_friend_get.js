var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');


module.exports.controller = function(app){
    app.get('/api/friends/:userid', app.oauth.authorise(), function(request, result){

        var userId = request.params.userid;

        OAuthTokens.getTokensUserId(request, result, isUserFriend);

        function isUserFriend(userId, err){
            if(err === false && userId != null){
                this.userId = userId;
                Friends.isUserFriend(request.query.userid, userId, handleIsUserFriendResponse);
            }
            else{
                result.sendStatus(500);
            }
        }

        function handleIsUserFriendResponse(obj, err) {
            if (err === false && obj.length === 0) {
                //User is not friend
                finishGet(false);
            }
            else if (err === false && obj.length !== 0) {
                //User is friend
                finishGet(true);
            }
            else {
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