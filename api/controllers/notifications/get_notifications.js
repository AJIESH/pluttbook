var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Notifications = require('../../dbFunctions/Notifications.js');

module.exports.controller = function(app){
    app.get('/api/notifications', app.oauth.authorise(), function(request, result){

        OAuthTokens.getTokensUserId(request, result, getNotifications);

        function getNotifications(userId, err){
            if(!err){
                Notifications.getNotifications(userId, finishGet)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(notifications, err){
            if(!err && notifications.length === 1){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(notifications[0].notifications));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};