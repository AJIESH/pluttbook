var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Statuses = require('../dbFunctions/Statuses.js');
var HelperFuncs = require('../common/helperFunctions.js');

var request, result;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(!validPost()){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, saveStatus);
    });

    app.get('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, getStatus);
    });
};

function saveStatus(userId, err){
    if(err === false && userId !== null){
        var status = request.body.status;
        var date = HelperFuncs.getUnixTime();

        Statuses.saveStatus(userId, status, date, finishPost);
    }
    else{
        result.sendStatus(500);
    }
}

function finishPost(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}

function getStatus(id, err){
    if(id !== null && err === false){
        Statuses.getStatuses(id, finishGet)
    }
    else{
        result.sendStatus(500);
    }
}

function finishGet(statuses, err){
    if(!err){
        result.setHeader('Content-Type', 'application/json');
        result.send(JSON.stringify(statuses));
    }
    else{
        result.sendStatus(500);
    }
}

function validPost(){
    return request.body.status !== null;
}