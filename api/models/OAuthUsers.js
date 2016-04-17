module.exports.model = function(db){
    var OAuthUsers =  new db.Schema({
        email: { type: String, default: '' },
        password: { type: String }
    });

    module.exports.schema = db.model('OAuthUsers', OAuthUsers);
};