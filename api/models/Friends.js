module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: {type: String},
        friends: [{
            userId: {type: String}
        }]
    }, {collection: 'friends'});

    module.exports.schema = db.model('friends', schema);
};