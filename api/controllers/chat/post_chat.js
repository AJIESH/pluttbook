var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var AvailableFriends = require('../../common/getAvailableFriends.js');
var Chat = require('../../dbFunctions/Chat.js');

module.exports.controller = function(app){
    app.post('/api/chat', app.oauth.authorise(), function(request, result){

        var currentUserId = null;

        var body = {
            text: request.body.text,
            receiverId: request.body.receiverId
        };

        if(body.text === null || body.receiverId === null){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, getAvailableFriends);

        function getAvailableFriends(userId, err){
            if(!err){
                currentUserId = userId;
                AvailableFriends.getAllAvailableFriends(userId, result, saveChat)
            }
            else{
                result.sendStatus(500);
            }
        }

        //Check if recipient is friend that is online
        function saveChat(friends, err){
            if(!err){
                var isFriend = false;
                for(var i=0; i<friends.length; i++){
                    if(friends[i].userId ===  body.receiverId){
                        isFriend = true;
                        break;
                    }
                }
                if(isFriend){
                    Chat.saveChat(currentUserId, body.receiverId, body.text, finishPost);
                }
                else{
                    result.sendStatus(400);
                }
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishPost(obj, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.sendStatus(200);
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};