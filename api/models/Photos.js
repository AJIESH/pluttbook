module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: {type: String},
        profilePhotoName: {type: String},
        profilePhoto: {type: String},
        coverPhotoName: {type: String},
        coverPhoto: {type: String}
    }, {collection: 'photos'});

    module.exports.schema = db.model('photos', schema);
};