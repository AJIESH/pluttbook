module.exports = function($http, localStorageService){
    return {
        login : login
    };

    function login(loginCredentials) {
        return  $http.post('api/login', formatData(loginCredentials), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(saveTokenToLocalStorage)
            .error(loginError);

        function loginError(response){
            console.log(response);
        }

        function saveTokenToLocalStorage(token){
            localStorageService.set('authorizationData', { token: token.access_token, username: loginCredentials.username, refreshToken: "", useRefreshTokens: false });
        }

        function formatData(loginCreds){
           return "grant_type=password&username=" + loginCreds.username + "&password=" + loginCreds.password + "&client_id=client" +
               "&client_secret=secret";
        }
    }


};