var OAuthUsersModel = require('../models/OAuthUsers.js');

module.exports.controller = function(app, db){
    app.post('/api/login',app.oauth.grant());
};

