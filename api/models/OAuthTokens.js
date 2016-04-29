module.exports.model = function(db){
    var OAuthToken =  new db.Schema({
        accessToken: { type: String },
        expires: { type: Date },
        clientId: { type: String },
        //refreshToken: { type: String },
        //refreshTokenExpiresOn: { type: Date },
        userId: { type: String }
    });

    module.exports.schema = db.model('OAuthTokens', OAuthToken);
};