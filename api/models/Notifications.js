module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: { type: String, required: true },
        notifications: [{
            fromUserId: {type: String, required: true},
            type: {type: String, required: true}
        }]
    }, {collection: 'notifications'});

    module.exports.schema = db.model('notifications', schema);
};