var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');

module.exports.controller = function(app){
    app.get('/api/friends/:userid', app.oauth.authorise(), function(request, result){

        var userId = request.params.userid;

        Friends.getFriends(userId, getFriendsUserInfo);

        function getFriendsUserInfo(friends, err){
            if(!err){
                Friends.getFriendsUserInfoAsync(friends[0].friends, finishGet);
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