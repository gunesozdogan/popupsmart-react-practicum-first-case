import accounts from "./account.js";
import utilityFunctions from "./utility.js";

const DOM = (function () {
    const myAccounts = accounts();
    const myUtilityFunctions = utilityFunctions;

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
    let isLoginPressed = false;

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

    function createAddTodoBtn() {
        const btn = createElementWithClass("button", "add-todo-btn");
        const todosSection = document.querySelector(".todos-section");
        btn.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg 
        class="add-todo-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg> Add Todo`;
        todosSection.appendChild(btn);
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

    function createElementWithClass(el, className) {
        const element = document.createElement(el);
        element.classList.add(className);
        return element;
    }

    async function login(e) {
        if (isLoginPressed) {
            return;
        }
        isLoginPressed = true;
        if (!isUsernameValidationCorrect()) {
            showFormError();
            e.preventDefault();
            isLoginPressed = false;
            return;
        }
        const username = usernameInput.value;
        // If entered username exists, logs in
        if (await myAccounts.doesUsernameExist(username)) {
            closeForm();
            // Changes login button on top right to account button
            loginBtn.textContent = username + "";
            // Adds down arrow
            loginBtn.innerHTML = `${username}<?xml version="1.0" ?><svg class= "dropdown-arrow-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>`;
            loginBtn.classList.remove("login-btn");
            loginBtn.classList.add("account-btn");
            clearTodos();
            await displayUserTodos(username);
            createAddTodoBtn();
            isLoginPressed = false;
        } else {
            usernameError.classList.remove("hidden");
            isLoginPressed = false;
        }
    }

    async function displayUserTodos(username) {
        const todos = await myAccounts.getUserTodos(username);
        const todosSection = document.querySelector(".todos-section");
        todos.forEach(todo => {
            // creates elements to display each todo
            const div = createElementWithClass("div", "todo-container");
            const divLeft = createElementWithClass(
                "div",
                "todo-container-left"
            );
            const divRight = createElementWithClass(
                "div",
                "todo-container-right"
            );
            const completeBtn = createElementWithClass(
                "button",
                "todo-isCompleted"
            );
            const p = createElementWithClass("p", "todo-content");
            const span = createElementWithClass("span", "todo-date");
            const editBtn = createElementWithClass("button", "todo-edit");
            editBtn.textContent = "Edit";
            p.textContent = todo.content;
            span.textContent = myUtilityFunctions.formatDate(
                new Date(todo.date)
            );
            divLeft.append(completeBtn, p);
            divRight.append(span, editBtn);
            div.append(divLeft, divRight);
            todosSection.appendChild(div);
        });
    }

    function clearTodos() {
        const todosSection = document.querySelector(".todos-section");
        while (todosSection.firstChild) {
            todosSection.removeChild(todosSection.lastChild);
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
