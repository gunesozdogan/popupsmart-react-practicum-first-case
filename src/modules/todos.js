import accounts from "./account.js";
import UI from "./UI.js";
import utilityFunctions from "./utility.js";

const todos = (function () {
    const myAccounts = accounts;
    const myUtilityFunctions = utilityFunctions;
    const todosSection = document.querySelector(".todos-section");

    // Creates add todo button
    function createAddTodoBtn() {
        const btn = utilityFunctions.createElementWithClass(
            "button",
            "add-todo-btn"
        );
        btn.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg 
            class="add-todo-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg> Add Todo`;
        return btn;
    }

    // creates elements to display each todo
    function createTodoElement(todo) {
        const div = myUtilityFunctions.createElementWithClass(
            "div",
            "todo-container"
        );
        const divLeft = myUtilityFunctions.createElementWithClass(
            "div",
            "todo-container-left"
        );
        const divRight = myUtilityFunctions.createElementWithClass(
            "div",
            "todo-container-right"
        );
        const completeBtn = myUtilityFunctions.createElementWithClass(
            "button",
            "todo-isCompleted"
        );
        const p = myUtilityFunctions.createElementWithClass(
            "p",
            "todo-content"
        );
        const span = myUtilityFunctions.createElementWithClass(
            "span",
            "todo-date"
        );
        const editBtn = myUtilityFunctions.createElementWithClass(
            "button",
            "todo-edit"
        );

        editBtn.textContent = "Edit";
        p.textContent = todo.content;
        span.textContent = myUtilityFunctions.formatDate(new Date(todo.date));

        divLeft.append(completeBtn, p);
        divRight.append(span, editBtn);
        div.append(divLeft, divRight);

        return div;
    }

    // Displays todos on the main page
    async function displayUserTodos(username) {
        clearTodos();
        const todos = await myAccounts.getUserTodos(username);
        todos.forEach(todo => {
            todosSection.appendChild(createTodoElement(todo));
        });
    }

    function clearTodos() {
        while (todosSection.firstChild) {
            todosSection.removeChild(todosSection.lastChild);
        }
    }

    return { displayUserTodos, createAddTodoBtn };
})();

export default todos;
