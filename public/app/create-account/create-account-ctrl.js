module.exports = function(createAccountFactory) {
    var vm = this;
    //---Functions---
    vm.createAccount = createAccount;

    function createAccount(){
        var accountDetails = bundleAccountDetails();
        console.log(accountDetails);
        createAccountFactory.createAccount(accountDetails);
    };

    function bundleAccountDetails(){
        return {
            firstName: vm.firstName,
            lastName: vm.lastName,
            email: vm.email,
            password: vm.password,
            confirmPassword: vm.confirmPassword
        };
    }
};