module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: { type: String },
        status: { type: String },
        dateTime: { type: Date }
    }, {collection: 'statuses'});

    module.exports.schema = db.model('statuses', schema);
};