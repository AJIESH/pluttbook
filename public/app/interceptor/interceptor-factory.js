module.exports = function($window, localStorageService) {
    return {
        request: request,
        response: response
    };

    function request(config) {
        if(!urlPublic(config.url)) {
            var authData = getAuthData();
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            else{
                redirectToLogin();
                config = null;
            }
        }
        else{
            if(getAuthData()){
                $window.location.href = '/#/news-feed'
            }
        }
        return config;
    }

    function response(response){
        if(response.status === 401 && $window.location !== '/#/login'){
            redirectToLogin()
        }
        return response
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
        $window.location.href = '/#/login';
    }

    function getAuthData(){
        return localStorageService.get('authorizationData');
    }
};