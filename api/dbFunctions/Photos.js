var Photo = require('../models/Photos.js');

module.exports.savePhotos = function(userId, profilePhotoName, profilePhoto, coverPhotoName, coverPhoto, callback){
    var insertObject;
    if(profilePhoto && profilePhotoName && coverPhoto && coverPhotoName){
        insertObject = {
            profilePhotoName: profilePhotoName,
            profilePhoto: profilePhoto,
            coverPhotoName: coverPhotoName,
            coverPhoto: coverPhoto
        };
    }
    else if(profilePhoto && profilePhotoName && !coverPhoto && !coverPhotoName){
        insertObject = {
            profilePhotoName: profilePhotoName,
            profilePhoto: profilePhoto
        };
    }
    else if(!profilePhoto && !profilePhotoName && coverPhoto && coverPhotoName){
        insertObject = {
            coverPhotoName: coverPhotoName,
            coverPhoto: coverPhoto
        };
    }
    Photo.schema.findOneAndUpdate(
        {'userId': userId},
        insertObject,
        {upsert: true, new: true, runValidators: true}
    ).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.getPhotos = function(userId, callback){
    Photo.schema.find({userId: userId}, function(err, obj) {
        console.log(obj.length);
        if (err === null && obj.length === 1) {
            callback(obj[0], false);
        }
        else {
            callback(null, true);
        }
    });
};