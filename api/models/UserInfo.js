module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: {type: String},
        email: { type: String },
        firstName: { type: String },
        lastName: { type: String }
    }, {collection: 'user_info'});

    module.exports.schema = db.model('user_info', schema);
};