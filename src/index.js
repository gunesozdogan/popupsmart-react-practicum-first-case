const themeColorSwitchBtn = document.querySelector(".theme-color-switch-btn");
const root = document.querySelector(":root");

themeColorSwitchBtn.addEventListener("click", function () {
    root.classList.toggle("dark-theme");
    const icon = this.querySelector("img");

    if (this.classList.contains("dark-theme")) {
        icon.src = "icons/lightTheme.svg";
        this.classList.remove("dark-theme");
    } else {
        icon.src = "icons/darkTheme.svg";
        this.classList.add("dark-theme");
    }
});

const loginBtn = document.querySelector(".login-btn");
const dropDownList = document.querySelector(".dropdown-list");

loginBtn.addEventListener("click", function () {
    this.classList.remove("login-btn");
    this.classList.add("account-btn");
    this.textContent = "Güneş";
});
