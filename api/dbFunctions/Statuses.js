var Statuses = require('../models/Statuses.js');

module.exports.saveStatus = function(id, status, date, firstName, lastName, callback){
    var status = Statuses.schema({
        userId: id,
        status: status,
        dateTime: date,
        firstName: firstName,
        lastName: lastName
    });
    status.save(function(err){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getStatuses = function(id, callback){
    Statuses.schema.find({userId: id}).select('-userId').populate('-userId').exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    })
};
