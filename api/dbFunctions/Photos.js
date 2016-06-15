var Photo = require('../models/Photos.js');

module.exports.savePhotos = function(userId, profilePhotoName, profilePhoto, coverPhotoName, coverPhoto, callback){
    Photo.schema.findOneAndUpdate(
        {'userId': userId},
        {
            profilePhotoName: profilePhotoName,
            profilePhoto: profilePhoto,
            coverPhotoName: coverPhotoName,
            coverPhoto: coverPhoto
        },
        {upsert: true, new: true, runValidators: true}
    ).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};