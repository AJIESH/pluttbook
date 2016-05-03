module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: { type: String },
        status: { type: String },
        dateTime: { type: Number },
        firstName: { type: String },
        lastName: { type: String }
    }, {collection: 'statuses'});

    module.exports.schema = db.model('statuses', schema);
};