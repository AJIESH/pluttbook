var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');

var request, result;

module.exports.controller = function(app){
    app.get('/api/userInfo', app.oauth.authorise(), function(request, result){

        OAuthTokens.getTokensUserId(request, result, getUserInfo);

        //Todo: Check if user has access to this user's info and add ability to pass userId in url

        function getUserInfo(id, err){
            if(id !== null && err === false){
                UserInfo.getUserInfo(id, finishGet)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(userInfo, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(userInfo));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};