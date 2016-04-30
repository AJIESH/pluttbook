module.exports.controller = function(app){
    app.post('/api/oauth/token', app.oauth.grant());
};