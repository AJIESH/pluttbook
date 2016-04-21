module.exports = function($window, localStorageService) {
    return {
        request: request
    };

    function request(config) {
        if(!urlPublic(config.url)) {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            else{
                $window.location.href = '/#/login';
            }
        }
        return config;
    }

    function urlPublic(url){
        var publicRoutesArray = [
            './app/login/login.html',
            './app/create-account/create-account.html',
            'api/createAccount',
            'api/login'
        ];
        var urlPublic = false;
        for(var i=0; i<publicRoutesArray.length; i++){
            if(publicRoutesArray[i] === url){
                urlPublic = true;
                break;
            }
        }
        return urlPublic;
    }
};