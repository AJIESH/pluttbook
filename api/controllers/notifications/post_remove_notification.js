var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Notifications = require('../../dbFunctions/Notifications.js');

module.exports.controller = function(app){
    app.post('/api/notifications', app.oauth.authorise(), function(request, result){

        if(request.body.userId === null || request.body.type === null){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, removeNotifications);

        function removeNotifications(userId, err){
            if(!err){
                Notifications.removeNotification(userId, request.body.userId, request.body.type, finishPost)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishPost(notifications, err){
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