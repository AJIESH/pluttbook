var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var UserInfo = require('../dbFunctions/UserInfo.js');
var Statuses = require('../dbFunctions/Statuses.js');
var HelperFuncs = require('../common/helperFunctions.js');

var request, result;

module.exports.controller = function(app){
    app.post('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        if(!validPost(result)){
            result.sendStatus(400);
        }

        OAuthTokens.getTokensUserId(request, result, getUserInfo);
    });

    app.get('/api/status', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, getStatus);
    });
};

function getUserInfo(id, err){
    if(err === false && id != null){
        UserInfo.getUserInfo(id, saveStatus);
    }
    else{
        result.sendStatus(500);
    }
}

function saveStatus(userInfo, err){
    if(err === false && userInfo !== null){
        var status = request.body.status;
        var date = HelperFuncs.getUnixTime(new Date());

        Statuses.saveStatus(userInfo.userId, status, date, userInfo.firstName, userInfo.lastName, finishPost);
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