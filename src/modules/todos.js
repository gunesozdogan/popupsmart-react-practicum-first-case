import account from "./account.js";
import UI from "./UI.js";
import utilityFunctions from "./utility.js";

const todos = (function () {
    const myAccount = account;
    const myUtilityFunctions = utilityFunctions;
    const todosSection = document.querySelector(".todos-section");

    // creates elements to display each todo
    function _createTodoContainer(todo) {
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

        if (todo.isCompleted) {
            p.style.textDecoration = "line-through";
            span.style.textDecoration = "line-through";
        }

        editBtn.textContent = "Edit";
        div.addEventListener("click", switchCompleteTodo);
        completeBtn.addEventListener("click", deleteTodo);
        p.textContent = todo.content;
        span.textContent = myUtilityFunctions.formatDate(
            new Date(todo.date),
            "EEE do MMM yyyy"
        );

        divLeft.append(completeBtn, p);
        divRight.append(editBtn, span);
        div.append(divLeft, divRight);

        return div;
    }

    // Displays todos on the main page
    async function displayUserTodos(username) {
        clearTodos();
        const todos = await myAccount.getUserTodos(username);
        todos.forEach(todo => {
            todosSection.appendChild(_createTodoContainer(todo));
        });
    }

    function clearTodos() {
        while (todosSection.firstChild) {
            todosSection.removeChild(todosSection.lastChild);
        }
    }

    function switchCompleteTodo(e) {
        e.stopPropagation();

        const username = myAccount.username;
        const todoContainer = this;
        const todoContentEl = todoContainer.querySelector(".todo-content");
        const todoContent = todoContentEl.textContent;
        const todoDate = todoContainer.querySelector(".todo-date");
        const userTodos = myAccount.todos;

        // Strikes through the todo if its completed or deletes the strikethough otherwise
        todoContentEl.style.textDecoration =
            todoContentEl.style.textDecoration === "line-through"
                ? "none"
                : "line-through";
        todoDate.style.textDecoration =
            todoDate.style.textDecoration === "line-through"
                ? "none"
                : "line-through";

        myAccount.switchCompleteUserTodo(userTodos, todoContent);
        myAccount.updateUserTodos(username, userTodos);
    }

    function deleteTodo() {
        const username = myAccount.username;
        const userTodos = myAccount.todos;
        const todoContainer = this.closest(".todo-container");
        const todoContent =
            todoContainer.querySelector(".todo-content").textContent;

        todoContainer.remove();
        myAccount.deleteUserTodo(userTodos, todoContent);
        myAccount.updateUserTodos(username, userTodos);
    }

    return {
        displayUserTodos,
        clearTodos,
        deleteTodo,
        switchCompleteTodo,
    };
})();

export default todos;
