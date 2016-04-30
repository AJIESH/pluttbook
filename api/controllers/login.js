module.exports.controller = function(app){
    app.all('/api/login', app.oauth.grant());
};

