module.exports.model = function(db){
    var OAuthClients =  new db.Schema({
        clientId: { type: String },
        clientSecret: { type: String },
        redirectUris: { type: Array }
    });

    module.exports.schema = db.model('OAuthClients', OAuthClients);
};