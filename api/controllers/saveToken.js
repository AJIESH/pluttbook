module.exports.controller = function(app, db){
    app.post('/api/oauth/token', app.oauth.grant());
};