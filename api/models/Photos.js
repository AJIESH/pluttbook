module.exports.model = function(db){
    var schema =  new db.Schema({
        userId: {type: String},
        profilePhotoName: {type: String},
        profilePhoto: {type: Buffer},
        coverPhotoName: {type: String},
        coverPhoto: {type: Buffer}
    }, {collection: 'photos'});

    module.exports.schema = db.model('photos', schema);
};