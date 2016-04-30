var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');

var request, result, status;

module.exports.controller = function(app){
    app.post('/api/statuses', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(!validGetData(result)){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, saveStatus);
    });
};

function saveStatus(id, err){
    if(id !== null && err === false){
        var email = id;
        var status = request.param('status');
        var date = new Date();
        console.log(email + " " + status + " " + date);

        Statuses.saveStatus(email, status, date, finish)
    }
    else{
        result.sendStatus(500);
    }
}

function finish(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}

function validGetData(data){
    return data.param('status') !== null;
}