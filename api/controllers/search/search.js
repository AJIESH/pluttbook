var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');

module.exports.controller = function(app){
    app.get('/api/search/:query', app.oauth.authorise(), function(request, result){

        var query = request.params.query;

        UserInfo.search(query, finishGet);

        function finishGet(queryResults, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(queryResults));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};