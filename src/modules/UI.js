import todos from './todos.js';
import account from './account.js';
import utilityFunctions from './utility.js';

const UI = (function () {
    // Modules
    const myAccount = account;
    const myTodos = todos;
    const myUtilityFunctions = utilityFunctions;
    const themeColorSwitchBtn = document.querySelector(
        '.theme-mode-switch-btn'
    );
    const root = document.querySelector(':root');
    const loginBtn = document.querySelector('.login-btn');
    const logOutBtn = document.querySelector('.logout-btn');
    const overlay = document.querySelector('.overlay-general');
    const formLoginBtn = document.querySelector('.form-login-btn');
    const usernameInput = document.querySelector('.username-input');
    const usernameError = document.querySelector('.username-error');
    const formCloseBtn = document.querySelector('.form-close-btn');
    const themeName = document.querySelector('.theme-name');
    const todosSection = document.querySelector('.todos-section');
    const loginForm = document.querySelector('.login-form');
    let isLoginPressed = false;

    themeColorSwitchBtn.addEventListener('click', switchThemeMode);
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
    formCloseBtn.addEventListener('click', closeForm);

    // Changes theme color and theme icon
    function switchThemeMode() {
        root.classList.toggle('dark-theme');
        const icon = this.querySelector('img');

        if (this.classList.contains('dark-theme')) {
            icon.src = 'icons/lightTheme.svg';
            this.classList.remove('dark-theme');
            themeName.textContent = 'Dark Mode';
        } else {
            icon.src = 'icons/darkTheme.svg';
            this.classList.add('dark-theme');
            themeName.textContent = 'Light Mode';
        }
    }

    function displayLoginForm() {
        // If already logged in form does not pop up
        if (!this.classList.contains('login-btn')) return;
        overlay.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        usernameInput.value = '';
        usernameError.classList.add('hidden');
    }

    function logout() {
        const accountBtn = document.querySelector('.account-btn');
        accountBtn.classList.remove('account-btn');
        accountBtn.classList.add('login-btn');
        accountBtn.textContent = 'Login';
        myTodos.clearTodos();
    }

    function closeForm() {
        overlay.classList.add('hidden');
        loginForm.classList.add('hidden');
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
        if (!myUtilityFunctions.isInputValidationCorrect.bind(usernameInput)) {
            myUtilityFunctions.showInputValidationError.bind(usernameInput);
            e.preventDefault();
            isLoginPressed = false;
            return;
        }
        formOverlay.classList.remove('hidden');
        // If entered username exists, logs in
        const username = usernameInput.value;
        if (await myAccount.doesUsernameExist(username)) {
            // Displays todos and add task button
            await myTodos.displayUserTodos(username);
            switchToAccount(username);
            myTodos.displayAddTodoButton(todosSection);
            closeForm();
            formOverlay.classList.add('hidden');
            isLoginPressed = false;
        } else {
            formOverlay.classList.add('hidden');
            // Else displays error message
            usernameError.classList.remove('hidden');
            isLoginPressed = false;
        }
    }

    return {};
})();

export default UI;
