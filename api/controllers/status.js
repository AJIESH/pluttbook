var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');

var request, result, status;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(!validGetRequest(result)){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, saveStatus);
    });
};

function saveStatus(id, err){
    if(id !== null && err === false){
        var email = id;
        var status = request.body.status;
        var date = new Date();

        Statuses.saveStatus(email, status, date, finish)
    }
    else{
        result.sendStatus(500);
    }
}

function finish(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}

function validGetRequest(){
    return request.body.status !== null;
}