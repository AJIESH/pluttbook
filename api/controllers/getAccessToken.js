module.exports.controller = function(app, db){
    app.all('/api/oauth/token', app.oauth.grant(), function(req, res){
        console.log('token');
    });
};