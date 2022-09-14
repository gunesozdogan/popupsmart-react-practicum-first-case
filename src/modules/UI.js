import todos from "./todos.js";
import account from "./account.js";
import utilityFunctions from "./utility.js";

const UI = (function () {
    // Modules
    const myAccount = account;
    const myTodos = todos;
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
    const todosSection = document.querySelector(".todos-section");
    let isLoginPressed = false;

    themeColorSwitchBtn.addEventListener("click", switchThemeMode);
    loginBtn.addEventListener("click", displayLoginForm);
    logOutBtn.addEventListener("click", logout);
    formLoginBtn.addEventListener("click", login);
    usernameInput.addEventListener("input", showFormError);
    formCloseBtn.addEventListener("click", closeForm);

    // Changes theme color and theme icon
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

    function displayLoginForm() {
        // If already logged in form does not pop up
        if (!this.classList.contains("login-btn")) return;
        overlay.classList.remove("hidden");
        usernameInput.value = "";
        usernameError.classList.add("hidden");
    }

    function logout() {
        const accountBtn = document.querySelector(".account-btn");
        accountBtn.classList.remove("account-btn");
        accountBtn.classList.add("login-btn");
        accountBtn.textContent = "Login";
        myTodos.clearTodos();
    }

    // Creates add todo button
    function createAddTodoBtn() {
        const btn = utilityFunctions.createElementWithClass(
            "button",
            "add-todo-btn"
        );
        btn.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg 
                class="add-todo-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg> Add Todo`;
        btn.addEventListener("click", displayAddTodoForm);
        return btn;
    }

    function removeAddTodoBtn() {
        const btn = document.querySelector(".add-todo-btn");
        btn.remove();
    }

    function removeAddTodoForm() {
        const form = document.querySelector(".add-todo-form-container");
        form.remove();
        displayAddTodoButton(todosSection);
    }

    // Creates input form for adding todo and displays it
    function displayAddTodoForm() {
        removeAddTodoBtn();
        const addTodoContainer = myUtilityFunctions.createElementWithClass(
            "div",
            "add-todo-form-container"
        );
        const inputContainer = myUtilityFunctions.createElementWithClass(
            "div",
            "todo-form-input-container"
        );
        const nameInput = myUtilityFunctions.createElementWithClass(
            "input",
            "add-todo-form-name-input"
        );
        const dateInput = myUtilityFunctions.createElementWithClass(
            "input",
            "add-todo-form-date-input"
        );
        const btnContainer = myUtilityFunctions.createElementWithClass(
            "div",
            "todo-form-btn-container"
        );
        const addBtn = myUtilityFunctions.createElementWithClass(
            "button",
            "add-todo-form-btn"
        );
        const cancelBtn = myUtilityFunctions.createElementWithClass(
            "button",
            "cancel-todo-form-btn"
        );

        nameInput.placeHolder = "Todo Name";
        nameInput.type = "text";
        nameInput.spellcheck = false;
        dateInput.type = "date";
        dateInput.value = myUtilityFunctions.formatDate(
            new Date(),
            "yyyy-MM-dd"
        );
        addBtn.textContent = "Add";
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", removeAddTodoForm);
        inputContainer.append(nameInput, dateInput);
        btnContainer.append(addBtn, cancelBtn);
        addTodoContainer.append(inputContainer, btnContainer);
        todosSection.appendChild(addTodoContainer);
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

    function switchToAccount(username) {
        // Changes login button on top right to account button
        loginBtn.textContent = username + "";
        // Adds down arrow icon
        loginBtn.innerHTML = `${username}<?xml version="1.0" ?><svg class= "dropdown-arrow-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>`;
        loginBtn.classList.remove("login-btn");
        loginBtn.classList.add("account-btn");
    }

    function displayAddTodoButton(el) {
        el.appendChild(createAddTodoBtn());
    }

    // Logs user in
    async function login(e) {
        const formOverlay = document.querySelector(".overlay-form");

        // Disables pressing login button multiple times
        if (isLoginPressed) {
            return;
        }
        isLoginPressed = true;

        // If username is not in right form
        if (!isUsernameValidationCorrect()) {
            showFormError();
            e.preventDefault();
            isLoginPressed = false;
            return;
        }
        formOverlay.classList.remove("hidden");
        // If entered username exists, logs in
        const username = usernameInput.value;
        if (await myAccount.doesUsernameExist(username)) {
            closeForm();
            switchToAccount(username);
            // Displays todos and add task button
            await myTodos.displayUserTodos(username);
            displayAddTodoButton(todosSection);
            formOverlay.classList.add("hidden");
            isLoginPressed = false;
        } else {
            formOverlay.classList.add("hidden");
            // Else displays error message
            usernameError.classList.remove("hidden");
            isLoginPressed = false;
        }
    }

    return {};
})();

export default UI;
