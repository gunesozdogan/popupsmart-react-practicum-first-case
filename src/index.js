const btn = document.querySelector(".theme-color-switch-btn");
const root = document.querySelector(":root");

btn.addEventListener("click", function () {
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
