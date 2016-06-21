module.exports.model = function(db){
    var schema =  new db.Schema({
        senderId: {type: String},
        receiverId: {type: String},
        message: {type: String},
        dateTime: {type: Date}
    }, {collection: 'chat'});

    module.exports.schema = db.model('chat', schema);
};