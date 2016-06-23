var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');
var Chat = require('../../dbFunctions/Chat.js');
var HelperFuncs = require('../../common/helperFunctions.js');

module.exports.controller = function(app){
    app.get('/api/chat/:userid', app.oauth.authorise(), function(request, result){

        var currentUserId = '';
        var friendId = request.params.userid;

        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(!err){
                currentUserId = userId;
                Friends.getFriends(currentUserId, getMessages);
            }
            else{
                result.sendStatus(500);
            }
        }

        function getMessages(friendsArray, err){
            if(!err){
                var friends = friendsArray[0].friends;
                var isFriend = false;
                for(var i=0; i<friends.length; i++){
                    if(friendId === friends[i].userId){
                        isFriend = true;
                        break;
                    }
                }
                if(isFriend){
                    Chat.getMessages(currentUserId, friendId, finishGet)
                }
                else{
                    result.sendStatus(400);
                }
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(messages, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(HelperFuncs.quickSort(messages, reverseDateSort)));
            }
            else{
                result.sendStatus(500);
            }
        }
    });

    function reverseDateSort(a, b){
        return a.dateTime < b.dateTime;
    }
};