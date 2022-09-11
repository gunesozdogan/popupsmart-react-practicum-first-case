import accounts from "./account.js";

const DOM = (function () {
    const myAccounts = accounts();
    const themeColorSwitchBtn = document.querySelector(
        ".theme-mode-switch-btn"
    );
    const root = document.querySelector(":root");
    const loginBtn = document.querySelector(".login-btn");
    const logOutBtn = document.querySelector(".logout-btn");
    const overlay = document.querySelector(".overlay");
    const formLoginBtn = document.querySelector(".form-login-btn");
    const usernameInput = document.querySelector(".username-input");
    const usernameError = document.querySelector(".username-error");
    const formCloseBtn = document.querySelector(".form-close-btn");
    const themeName = document.querySelector(".theme-name");
    // const loginForm = document.querySelector(".login-form");

    function switchThemeMode() {
        root.classList.toggle("dark-theme");
        const icon = this.querySelector("img");

        if (this.classList.contains("dark-theme")) {
            icon.src = "icons/lightTheme.svg";
            this.classList.remove("dark-theme");
            themeName.textContent = "Dark Mode";
        } else {
            icon.src = "icons/darkTheme.svg";
            this.classList.add("dark-theme");
            themeName.textContent = "Light Mode";
        }
    }
    function displayForm() {
        overlay.classList.remove("hidden");
        usernameInput.value = "";
        usernameError.classList.add("hidden");
    }

    function logout() {
        const accountBtn = document.querySelector(".account-btn");
        accountBtn.classList.remove("account-btn");
        accountBtn.classList.add("login-btn");
        accountBtn.textContent = "Login";
    }

    // Displays username validation error
    function showFormError() {
        if (!isUsernameValidationCorrect()) {
            usernameInput.setCustomValidity(
                "Username must be at least 6 characters"
            );
            usernameInput.reportValidity();
        } else {
            usernameInput.setCustomValidity("");
        }
    }
    // Checks username input
    function isUsernameValidationCorrect() {
        if (usernameInput.validity.tooShort || usernameInput.value === "") {
            return false;
        } else return true;
    }

    function closeForm() {
        overlay.classList.add("hidden");
    }

    async function login(e) {
        if (!isUsernameValidationCorrect()) {
            showFormError();
            e.preventDefault();
            return;
        }
        const username = usernameInput.value;
        // If entered username exists, logs in
        if (await myAccounts.doesUsernameExist(username)) {
            closeForm();
            loginBtn.textContent = username + "";
            loginBtn.innerHTML = `${username}<?xml version="1.0" ?><svg class= "dropdown-arrow-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>`;
            loginBtn.classList.remove("login-btn");
            loginBtn.classList.add("account-btn");
        } else {
            usernameError.classList.remove("hidden");
        }
    }

    themeColorSwitchBtn.addEventListener("click", switchThemeMode);
    loginBtn.addEventListener("click", displayForm);
    logOutBtn.addEventListener("click", logout);
    formLoginBtn.addEventListener("click", login);
    usernameInput.addEventListener("input", showFormError);
    formCloseBtn.addEventListener("click", closeForm);
})();

export default DOM;
