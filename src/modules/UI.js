import todos from './todos.js';
import account from './account.js';
import utilityFunctions from './utility.js';
import localStorageModule from './localStorage.js';

const UI = (function () {
    // Modules
    const myAccount = account;
    const myLocalStorage = localStorageModule;
    const myTodos = todos;
    const myUtilityFunctions = utilityFunctions;
    const themeModeSwitchBtn = document.querySelector('.theme-mode-switch-btn');
    const root = document.querySelector(':root');
    const loginBtn = document.querySelector('.login-btn');
    const logOutBtn = document.querySelector('.logout-btn');
    const overlay = document.querySelector('.overlay-general');
    const formLoginBtn = document.querySelector('.form-login-btn');
    const usernameInput = document.querySelector('.username-input');
    const usernameError = document.querySelector('.username-error');
    const formCloseBtn = [...document.querySelectorAll('.form-close-btn')];
    const themeName = document.querySelector('.theme-name');
    const todosSection = document.querySelector('.todos-section');
    const loginForm = document.querySelector('.login-form');
    const signupBtnLoginForm = document.querySelector('.sign-up-btn');
    const signupBtnSignupForm = document.querySelector('.form-signup-btn');
    const signupForm = document.querySelector('.signup-form');
    const signupUsernameInput = document.querySelector(
        '.signup-username-input'
    );
    const signupFormOverlay = document.querySelector('.signup-overlay-form');
    const signupFormError = document.querySelector('.signup-username-error');
    const inboxBtn = document.querySelector('.inbox-heading');

    let isLoginPressed = false;

    themeModeSwitchBtn.addEventListener('click', switchThemeMode);
    loginBtn.addEventListener('click', displayLoginForm);
    logOutBtn.addEventListener('click', logout);
    formLoginBtn.addEventListener('click', login);
    usernameInput.addEventListener(
        'input',
        myUtilityFunctions.showInputValidationError.bind(
            usernameInput,
            usernameInput
        )
    );
    formCloseBtn.forEach((btn) => btn.addEventListener('click', closeForm));
    signupBtnLoginForm.addEventListener('click', displaySignupForm);
    signupUsernameInput.addEventListener(
        'input',
        myUtilityFunctions.showInputValidationError.bind(
            signupUsernameInput,
            signupUsernameInput
        )
    );
    signupBtnSignupForm.addEventListener('click', signup);

    // initialize account if account is saved to localstorage
    initializeAccount();

    // Changes theme color and theme icon
    function switchThemeMode(darkMode) {
        const icon = themeModeSwitchBtn.querySelector('img');
        // for initializing preference
        if (darkMode === true) {
            root.classList.add('dark-theme');
            icon.src = 'icons/darkTheme.svg';
            themeModeSwitchBtn.classList.add('dark-theme');
            themeName.textContent = 'Light Mode';
        } else if (darkMode === false) {
            root.classList.remove('dark-theme');
            icon.src = 'icons/lightTheme.svg';
            themeModeSwitchBtn.classList.remove('dark-theme');
            themeName.textContent = 'Dark Mode';
            // Switch
        } else {
            root.classList.toggle('dark-theme');
            if (themeModeSwitchBtn.classList.contains('dark-theme')) {
                icon.src = 'icons/lightTheme.svg';
                themeModeSwitchBtn.classList.remove('dark-theme');
                themeName.textContent = 'Dark Mode';
                myAccount.darkMode = false;
            } else {
                icon.src = 'icons/darkTheme.svg';
                themeModeSwitchBtn.classList.add('dark-theme');
                themeName.textContent = 'Light Mode';
                myAccount.darkMode = true;
            }
        }
        myLocalStorage.saveAccount(myAccount);
    }

    function displayLoginForm() {
        // If already logged in form does not pop up
        if (!loginBtn.classList.contains('login-btn')) return;
        overlay.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        usernameInput.value = '';
        usernameError.classList.add('hidden');
    }

    function displaySignupForm() {
        overlay.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');

        signupUsernameInput.value = '';
        signupFormError.classList.add('hidden');
    }

    function logout() {
        const accountBtn = document.querySelector('.account-btn');
        accountBtn.classList.remove('account-btn');
        accountBtn.classList.add('login-btn');
        accountBtn.textContent = 'Login';
        myTodos.clearTodos();
        localStorage.clear();
        inboxBtn.classList.remove('clicked');
    }

    function closeForm() {
        overlay.classList.add('hidden');
        loginForm.classList.add('hidden');
        signupForm.classList.add('hidden');
    }

    function switchToAccount(username) {
        // Changes login button on top right to account button
        loginBtn.textContent = username + '';
        // Adds down arrow icon
        loginBtn.innerHTML = `${username}<?xml version="1.0" ?><svg class= "dropdown-arrow-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>`;
        loginBtn.classList.remove('login-btn');
        loginBtn.classList.add('account-btn');
    }

    // Logs user in
    async function login(e) {
        const formOverlay = document.querySelector('.overlay-form');

        // Disables pressing login button multiple times
        if (isLoginPressed) {
            return;
        }
        isLoginPressed = true;

        // If username is not in right form
        if (!myUtilityFunctions.isValid(usernameInput)) {
            myUtilityFunctions.showInputValidationError(usernameInput);
            e.preventDefault();
            isLoginPressed = false;
            return;
        }
        formOverlay.classList.remove('hidden');
        const username = usernameInput.value;
        const userData = await myAccount.getUserData(username);

        // If entered username exists, logs in
        if (userData) {
            const userTodos = userData.todos;
            myAccount.setAccountProperties(userData);
            // Displays todos and add task button
            await myTodos.displayUserTodos(userTodos);
            inboxBtn.classList.add('clicked');
            switchToAccount(username);
            myTodos.displayAddTodoButton(todosSection);
            closeForm();
            formOverlay.classList.add('hidden');
            isLoginPressed = false;
            myLocalStorage.saveAccount(myAccount);
        } else {
            formOverlay.classList.add('hidden');
            // Else displays error message
            usernameError.classList.remove('hidden');
            isLoginPressed = false;
        }
    }

    async function signup(e) {
        const username = signupUsernameInput.value;

        if (!myUtilityFunctions.isValid(signupUsernameInput)) {
            myUtilityFunctions.showInputValidationError(signupUsernameInput);
            e.preventDefault();
            return;
        }
        signupFormOverlay.classList.remove('hidden');
        let userData = await myAccount.getUserData(username);

        if (userData) {
            signupFormError.classList.remove('hidden');
            signupFormOverlay.classList.add('hidden');
            return;
        }

        // creates new account
        await myAccount.addNewAccount(username);
        userData = await myAccount.getUserData(username);
        // sets account properties to new account's
        myAccount.setAccountProperties(userData);
        signupFormOverlay.classList.add('hidden');
        closeForm();
        switchToAccount(username);
        myTodos.displayUserTodos(myAccount.todos);
        myTodos.displayAddTodoButton(todosSection);
        myAccount.username = username;
        myLocalStorage.saveAccount(myAccount);
    }

    function initializeAccount() {
        if (myLocalStorage.getAccount()) {
            myLocalStorage.initializeAccountProperties(myAccount);
            myTodos.displayUserTodos(myAccount.todos);
            switchToAccount(myAccount.username);
            myTodos.displayAddTodoButton(todosSection);
            switchThemeMode(account.darkMode);
            inboxBtn.classList.add('clicked');
        } else {
            displayLoginForm();
        }
    }
})();

export default UI;
