module.exports = function($q, $window, $location, localStorageService) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config) {
        if(!urlPublic(config.url)) {
            var authData = getAuthData();
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            else{
                redirectToLogin();
            }
        }
        else if(urlPublic(config.url) && authData){
            $location.path('/news-feed');
        }
        return config;
    }

    function response(response){
        return response
    }

    function responseError(response){
        var status = response.status;
        if(status === 401 && $window.location !== '/#/login'){
            redirectToLogin();
        }
        return response;
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

    function redirectToLogin(){
        localStorageService.clearAll();
        $location.path('./login');
    }

    function getAuthData(){
        return localStorageService.get('authorizationData');
    }
};