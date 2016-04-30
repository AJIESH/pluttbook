var Statuses = require('../models/Statuses.js');

module.exports.saveStatus = function(email, status, status, callback){
    var status = Statuses.schema({
        email: email,
        status: status
    });
    userInfo.save(function(err){
        err === null ? callback(false) : callback(true);
    })
};
