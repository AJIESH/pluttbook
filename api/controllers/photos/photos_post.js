var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Photos = require('../../dbFunctions/Photos.js');
var userId;

module.exports.controller = function(app){
    app.post('/api/photos', app.oauth.authorise(), function(request, result){

        OAuthTokens.getTokensUserId(request, result, savePhoto);

        function savePhoto(userId, err){
            if(err === false && userId != null) {
                Photos.savePhotos(userId, request.body.profilePhotoName, request.body.profilePhoto, request.body.profilePhotoThumbnail, request.body.coverPhotoName, request.body.coverPhoto, finishPost);
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishPost(photos, err){
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