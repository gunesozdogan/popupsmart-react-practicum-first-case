const localStorageModule = (function () {
    function saveAccount(account) {
        const data = {
            username: account.username,
            todos: account.todos,
            id: account.id,
            darkMode: account.darkMode,
        };
        localStorage.setItem('account', JSON.stringify(data));
    }

    function initializeAccountProperties(account) {
        const data = getAccount();
        account.username = data.username;
        account.todos = data.todos;
        account.id = data.id;
        account.darkMode = data.darkMode;
        console.log(account.darkMode);
    }

    function getAccount() {
        const data = localStorage.getItem('account');
        return JSON.parse(data);
    }

    return { saveAccount, initializeAccountProperties, getAccount };
})();

export default localStorageModule;
