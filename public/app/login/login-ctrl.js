module.exports = function(loginFactory) {
    var vm = this;
    //---Functions---
    vm.login = login;

    function login(){
        var loginCredentials = bundleLoginCredentials();
        loginFactory.login(loginCredentials);
    };

    function bundleLoginCredentials(){
        return {
            username: vm.email,
            password: vm.password
        };
    }
};