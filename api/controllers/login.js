module.exports.controller = function(app, db){
    app.all('/api/login', app.oauth.grant());
};

