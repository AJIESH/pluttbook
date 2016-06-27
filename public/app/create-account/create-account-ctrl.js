module.exports = function($location, createAccountFactory) {
    var vm = this;
    //---Functions---
    vm.createAccount = createAccount;
    vm.createAccountDisabled = createAccountDisabled;
    vm.removeEmailError = removeEmailError;
    //---Variables---
    vm.showEmailError = false;

    function createAccount(){
        var accountDetails = bundleAccountDetails();
        createAccountFactory.createAccount(accountDetails)
            .success(function(status){
                if(status === 'Bad Request'){
                    vm.showEmailError = true;
                }
                else if(status === 'OK'){
                    $location.path('/login');
                }
            });
    }

    function bundleAccountDetails(){
        return {
            firstName: vm.firstName,
            lastName: vm.lastName,
            email: vm.email,
            password: vm.password,
            confirmPassword: vm.confirmPassword
        };
    }

    function createAccountDisabled(){
        return !validString(vm.firstName) || !validString(vm.lastName) || !validString(vm.email) || !validString(vm.password) || vm.password !== vm.confirmPassword;
    }

    function validString(str){
        return str !== '' && str !== undefined && str !== null;
    }

    function removeEmailError(){
        vm.showEmailError = false;
    }
};