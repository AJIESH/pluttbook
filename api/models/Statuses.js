module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: { type: String, required: true },
        status: { type: String, required: true },
        dateTime: { type: Number, required: true},
        likes: [{
            userId: {type: String, required: true}
        }],
        comments: [{
            userId: {type: String, required: true},
            text: {type: String, required: true},
            dateTime: {type: Number, required: true}
        }]
    }, {collection: 'statuses'});

    module.exports.schema = db.model('statuses', schema);
};