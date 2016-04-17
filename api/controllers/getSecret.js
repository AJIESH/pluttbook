module.exports.controller = function(app, db){
    app.get('/api/secret', app.oauth.authorise(), function(req, res){
        //Will require a valid access token
        res.send('Secret Area');
    });
};