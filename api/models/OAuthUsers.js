module.exports.model = function(db){
    var OAuthUsers =  new db.Schema({
        email: { type: String, default: '' },
        firstname: { type: String },
        lastname: { type: String },
        password: { type: String },
        username: { type: String }
    });

    module.exports.schema = db.model('OAuthUsers', OAuthUsers);
};