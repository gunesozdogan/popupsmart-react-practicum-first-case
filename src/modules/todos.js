import account from './account.js';
import UI from './UI.js';
import utilityFunctions from './utility.js';

const todos = (function () {
    const myAccount = account;
    const myUtilityFunctions = utilityFunctions;
    const todosSection = document.querySelector('.todos-section');

    // creates elements to display each todo
    function _createTodoContainer(todo) {
        const div = myUtilityFunctions.createElementWithClass(
            'div',
            'todo-container'
        );
        const divLeft = myUtilityFunctions.createElementWithClass(
            'div',
            'todo-container-left'
        );
        const divRight = myUtilityFunctions.createElementWithClass(
            'div',
            'todo-container-right'
        );
        const completeBtn = myUtilityFunctions.createElementWithClass(
            'button',
            'todo-isCompleted'
        );
        const p = myUtilityFunctions.createElementWithClass(
            'p',
            'todo-content'
        );
        const span = myUtilityFunctions.createElementWithClass(
            'span',
            'todo-date'
        );
        const editBtn = myUtilityFunctions.createElementWithClass(
            'button',
            'todo-edit'
        );

        if (todo.isCompleted) {
            p.style.textDecoration = 'line-through';
            span.style.textDecoration = 'line-through';
        }

        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', displayEditTodoForm);
        div.addEventListener('click', switchCompleteTodo);
        completeBtn.addEventListener('click', deleteTodo);
        p.textContent = todo.content;
        span.textContent = myUtilityFunctions.formatDate(
            new Date(todo.date),
            'EEE do MMM yyyy'
        );

        divLeft.append(completeBtn, p, editBtn);
        divRight.append(span);
        div.append(divLeft, divRight);

        return div;
    }

    function _createEditTodoForm(el) {
        const curTodoContainer = el.closest('.todo-container');
        const curTodoContent =
            curTodoContainer.querySelector('.todo-content').textContent;

        const curTodoDate = myAccount.getTodoDate(
            curTodoContent,
            myAccount.todos
        );
        const container = myUtilityFunctions.createElementWithClass(
            'div',
            'edit-todo-container'
        );
        const contentInput = myUtilityFunctions.createElementWithClass(
            'input',
            'edit-todo-content-input'
        );
        const dateInput = myUtilityFunctions.createElementWithClass(
            'input',
            'edit-todo-date-input'
        );
        const btnContainer = myUtilityFunctions.createElementWithClass('div', [
            'edit-todo-btn-container',
            'todo-form-btn-container',
        ]);
        const editBtn = myUtilityFunctions.createElementWithClass('button', [
            'edit-todo-form-btn',
            'form-btn-add-edit',
        ]);
        const cancelBtn = myUtilityFunctions.createElementWithClass('button', [
            'cancel-todo-form-btn',
            'form-btn-cancel',
        ]);

        contentInput.placeholder = 'Todo Name';
        contentInput.type = 'text';
        dateInput.placeholder = 'Date';
        dateInput.type = 'date';
        dateInput.value = myUtilityFunctions.formatDate(
            new Date(curTodoDate),
            'yyyy-MM-dd'
        );
        editBtn.textContent = 'Edit';
        cancelBtn.textContent = 'Cancel';
        btnContainer.append(editBtn, cancelBtn);
        container.append(contentInput, dateInput, btnContainer);
        return container;
    }

    // Creates input form for adding todo and displays it
    function displayAddTodoForm() {
        removeAddTodoBtn();
        const addTodoContainer = myUtilityFunctions.createElementWithClass(
            'div',
            'add-todo-form-container'
        );
        const inputContainer = myUtilityFunctions.createElementWithClass(
            'div',
            'todo-form-input-container'
        );
        const nameInput = myUtilityFunctions.createElementWithClass(
            'input',
            'add-todo-form-name-input'
        );
        const dateInput = myUtilityFunctions.createElementWithClass(
            'input',
            'add-todo-form-date-input'
        );
        const btnContainer = myUtilityFunctions.createElementWithClass(
            'div',
            'todo-form-btn-container'
        );
        const addBtn = myUtilityFunctions.createElementWithClass('button', [
            'add-todo-form-btn',
            'form-btn-add-edit',
        ]);
        const cancelBtn = myUtilityFunctions.createElementWithClass('button', [
            'cancel-todo-form-btn',
            'form-btn-cancel',
        ]);

        nameInput.placeholder = 'Todo Name';
        nameInput.type = 'text';
        nameInput.spellcheck = false;
        nameInput.minLength = 3;
        nameInput.addEventListener(
            'input',
            myUtilityFunctions.showInputValidationError.bind(
                nameInput,
                nameInput
            )
        );
        dateInput.type = 'date';
        dateInput.value = myUtilityFunctions.formatDate(
            new Date(),
            'yyyy-MM-dd'
        );
        addBtn.textContent = 'Add';
        addBtn.addEventListener('click', addTodo);
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', removeAddTodoForm);
        inputContainer.append(nameInput, dateInput);
        btnContainer.append(addBtn, cancelBtn);
        addTodoContainer.append(inputContainer, btnContainer);
        todosSection.appendChild(addTodoContainer);
    }

    function displayEditTodoForm() {
        const overlay = document.querySelector('.overlay-general');
        const editTodoForm = document.querySelector('.edit-todo-form');
        overlay.classList.remove('hidden');
        editTodoForm.classList.remove('hidden');
        editTodoForm.appendChild(_createEditTodoForm(this));
    }

    function removeAddTodoBtn() {
        const btn = document.querySelector('.add-todo-btn');
        btn.remove();
    }

    function removeAddTodoForm() {
        const form = document.querySelector('.add-todo-form-container');
        form.remove();
        displayAddTodoButton(todosSection);
    }

    // Creates add todo button
    function createAddTodoBtn() {
        const btn = utilityFunctions.createElementWithClass(
            'button',
            'add-todo-btn'
        );
        btn.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg 
                class="add-todo-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg> Add Todo`;
        btn.addEventListener('click', displayAddTodoForm);
        return btn;
    }

    function displayAddTodoButton(el) {
        el.appendChild(createAddTodoBtn());
    }

    // Displays todos on the main page
    // for first login load username is given
    // when updating todos after creating new one username is not used
    async function displayUserTodos(username) {
        clearTodos();
        let todos;
        if (username) {
            todos = await myAccount.getUserTodos(username);
        } else {
            todos = myAccount.todos;
        }

        todos.forEach((todo) => {
            todosSection.appendChild(_createTodoContainer(todo));
        });
    }

    function clearTodos() {
        while (todosSection.firstChild) {
            todosSection.removeChild(todosSection.lastChild);
        }
    }

    function addTodo(e) {
        // If todo name is less than 3 characters returns
        const nameInput = document.querySelector('.add-todo-form-name-input');
        if (!myUtilityFunctions.isInputValidationCorrect(nameInput)) {
            myUtilityFunctions.showInputValidationError(nameInput);
            e.preventDefault();
            return;
        }
        const todoName = document.querySelector(
            '.add-todo-form-name-input'
        ).value;
        const formattedName = todoName[0].toUpperCase() + todoName.slice(1);
        const todoDate = document.querySelector(
            '.add-todo-form-date-input'
        ).value;
        const formattedDate = myUtilityFunctions.formatDate(
            new Date(todoDate),
            'MM/dd/yyyy'
        );
        const newTodo = myAccount.Todo(formattedName, formattedDate);

        myAccount.todos.push(newTodo);
        displayUserTodos();
        displayAddTodoButton(todosSection);
        myAccount.updateUserTodos(myAccount.username, myAccount.todos);
    }

    function switchCompleteTodo(e) {
        e.stopPropagation();

        const username = myAccount.username;
        const todoContainer = this;
        const todoContentEl = todoContainer.querySelector('.todo-content');
        const todoContent = todoContentEl.textContent;
        const todoDate = todoContainer.querySelector('.todo-date');
        const userTodos = myAccount.todos;

        // Strikes through the todo if its completed or deletes the strikethough otherwise
        todoContentEl.style.textDecoration =
            todoContentEl.style.textDecoration === 'line-through'
                ? 'none'
                : 'line-through';
        todoDate.style.textDecoration =
            todoDate.style.textDecoration === 'line-through'
                ? 'none'
                : 'line-through';

        myAccount.switchCompleteUserTodo(userTodos, todoContent);
        myAccount.updateUserTodos(username, userTodos);
    }

    function deleteTodo() {
        const username = myAccount.username;
        const userTodos = myAccount.todos;
        const todoContainer = this.closest('.todo-container');
        const todoContent =
            todoContainer.querySelector('.todo-content').textContent;

        todoContainer.remove();
        myAccount.deleteUserTodo(userTodos, todoContent);
        myAccount.updateUserTodos(username, userTodos);
    }

    function editTodo() {
        const todoContainerLeft = this.closest('.todo-container-left');
        const todoContent =
            todoContainerLeft.querySelector('.todo-content').textContent;
        myAccount.editUserTodo(myAccount.todos, todoContent);
    }

    return {
        displayUserTodos,
        clearTodos,
        deleteTodo,
        switchCompleteTodo,
        displayAddTodoButton,
        addTodo,
    };
})();

export default todos;
