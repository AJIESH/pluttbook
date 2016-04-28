module.exports = function($http, $window, localStorageService){
    return {
        login : login
    };

    function login(loginCredentials) {
        return  $http.post('api/login', formatData(loginCredentials), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(loginSuccess)
            .error(loginError);
    }

    function loginError(response){
        console.log(response);
    }

    function loginSuccess(token, loginCredentials){
        saveTokenToLocalStorage(token,loginCredentials);
        $window.location.href = '/#/news-feed';
    }

    function saveTokenToLocalStorage(token, loginCredentials){
        localStorageService.set('authorizationData', { token: token.access_token, username: loginCredentials.username, refreshToken: "", useRefreshTokens: false });
    }

    function formatData(loginCredentials){
        return "grant_type=password&username=" + loginCredentials.username + "&password=" + loginCredentials.password + "&client_id=client" +
            "&client_secret=secret";
    }


};