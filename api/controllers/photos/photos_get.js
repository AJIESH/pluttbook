var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Photos = require('../../dbFunctions/Photos.js');
var userId;

module.exports.controller = function(app){
    app.get('/api/photos/:userid', app.oauth.authorise(), function(request, result){

        var userId = request.params.userid;

        Photos.getPhotos(userId, finishGet);

        function finishGet(photos, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(photos));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};