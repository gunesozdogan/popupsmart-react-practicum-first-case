import account from './account.js';
import UI from './UI.js';
import utilityFunctions from './utility.js';

const todos = (function () {
    const myAccount = account;
    const myUtilityFunctions = utilityFunctions;
    const todosSection = document.querySelector('.todos-section');

    /////////////////////////////////////////////////////////////////////////////// CREATING TODO ELEMENTS
    // creates elements to display each todo
    function _createTodoContainer(todo) {
        const div = myUtilityFunctions.createElementWithClass('div', {
            className: 'todo-container',
            event: { type: 'click', functionName: switchCompleteTodo },
        });
        const divLeft = myUtilityFunctions.createElementWithClass('div', {
            className: 'todo-container-left',
        });
        const divRight = myUtilityFunctions.createElementWithClass('div', {
            className: 'todo-container-right',
        });
        const completeBtn = myUtilityFunctions.createElementWithClass(
            'button',
            {
                className: 'todo-isCompleted',
                event: { type: 'click', functionName: deleteTodo },
            }
        );
        const p = myUtilityFunctions.createElementWithClass('p', {
            className: 'todo-content',
            textContent: todo.content,
        });
        const span = myUtilityFunctions.createElementWithClass('span', {
            className: 'todo-date',
            textContent: myUtilityFunctions.formatDate(
                new Date(todo.date),
                'EEE do MMM yyyy'
            ),
        });
        const editBtn = myUtilityFunctions.createElementWithClass('button', {
            className: 'todo-edit',
            textContent: 'Edit',
            event: { type: 'click', functionName: displayEditTodoForm },
        });

        if (todo.isCompleted) {
            p.style.textDecoration = 'line-through';
            span.style.textDecoration = 'line-through';
        }

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
        // gives the todo content as edit form classname
        const container = myUtilityFunctions.createElementWithClass('div', {
            className: `edit-todo-container edit-todo-container-${curTodoContent.replace(
                / /g,
                '-'
            )}`,
        });
        const contentInput = myUtilityFunctions.createElementWithClass(
            'input',
            {
                className: 'edit-todo-content-input',
                type: 'text',
                value: curTodoContent,
                minLength: 3,
            }
        );
        const dateInput = myUtilityFunctions.createElementWithClass('input', {
            className: 'edit-todo-date-input',
            type: 'date',
            value: myUtilityFunctions.formatDate(
                new Date(curTodoDate),
                'yyyy-MM-dd'
            ),
        });
        const btnContainer = myUtilityFunctions.createElementWithClass('div', {
            className: 'todo-form-btn-container edit-todo-btn-container',
        });
        const editBtn = myUtilityFunctions.createElementWithClass('button', {
            className: 'form-btn-add-edit edit-todo-form-btn',
            textContent: 'Edit',
            type: 'button',
            event: {
                type: 'click',
                functionName: editTodo,
            },
        });
        const cancelBtn = myUtilityFunctions.createElementWithClass('button', {
            className: 'cancel-todo-form-btn form-btn-cancel',
            textContent: 'Cancel',
            type: 'button',
            event: {
                type: 'click',
                functionName: removeEditTodoForm,
            },
        });

        contentInput.addEventListener(
            'input',
            myUtilityFunctions.showInputValidationError.bind(
                contentInput,
                contentInput
            )
        );
        btnContainer.append(editBtn, cancelBtn);
        container.append(contentInput, dateInput, btnContainer);
        return container;
    }
    /////////////////////////////////////////////////////////////////////////////
    // ADDING TODOS
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

        // adds todo to array than pushes it to mock API
        myAccount.todos.push(newTodo);
        displayUserTodos();
        displayAddTodoButton(todosSection);
        myAccount.updateUserTodos(myAccount.username, myAccount.todos);
    }
    // Creates input form for adding todo and displays it
    function displayAddTodoForm() {
        removeAddTodoBtn();
        const addTodoContainer = myUtilityFunctions.createElementWithClass(
            'div',
            { className: 'add-todo-form-container' }
        );
        const inputContainer = myUtilityFunctions.createElementWithClass(
            'div',
            { className: 'todo-form-input-container' }
        );
        const nameInput = myUtilityFunctions.createElementWithClass('input', {
            className: 'add-todo-form-name-input',
            placeholder: 'Todo Name',
            type: 'text',
            spellcheck: false,
            minLength: 3,
        });
        const dateInput = myUtilityFunctions.createElementWithClass('input', {
            className: 'add-todo-form-date-input',
            type: 'date',
            value: myUtilityFunctions.formatDate(new Date(), 'yyyy-MM-dd'),
        });
        const btnContainer = myUtilityFunctions.createElementWithClass('div', {
            className: 'todo-form-btn-container',
        });
        const addBtn = myUtilityFunctions.createElementWithClass('button', {
            className: 'add-todo-form-btn form-btn-add-edit',
            textContent: 'Add',
            event: {
                type: 'click',
                functionName: addTodo,
            },
        });
        const cancelBtn = myUtilityFunctions.createElementWithClass('button', {
            className: 'cancel-todo-form-btn form-btn-cancel',
            textContent: 'Cancel',
            event: {
                type: 'click',
                functionName: removeAddTodoForm,
            },
        });
        nameInput.addEventListener(
            'click',
            myUtilityFunctions.showInputValidationError.bind(
                nameInput,
                nameInput
            )
        );
        inputContainer.append(nameInput, dateInput);
        btnContainer.append(addBtn, cancelBtn);
        addTodoContainer.append(inputContainer, btnContainer);
        todosSection.appendChild(addTodoContainer);
    }

    function removeAddTodoForm() {
        const form = document.querySelector('.add-todo-form-container');
        form.remove();
        displayAddTodoButton(todosSection);
    }
    // Creates add todo button
    function createAddTodoBtn() {
        const btn = utilityFunctions.createElementWithClass('button', {
            className: 'add-todo-btn',
            innerHTML: `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg 
                class="add-todo-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg> Add Todo`,
            event: { type: 'click', functionName: displayAddTodoForm },
        });

        return btn;
    }

    function removeAddTodoBtn() {
        const btn = document.querySelector('.add-todo-btn');
        btn.remove();
    }

    function displayAddTodoButton(el) {
        el.appendChild(createAddTodoBtn());
    }

    /////////////////////////////////////////////////////////////////////////////
    // EDIT TODOS
    function displayEditTodoForm(e) {
        e.stopPropagation();
        const overlay = document.querySelector('.overlay-general');
        const editTodoForm = document.querySelector('.edit-todo-form');
        overlay.classList.remove('hidden');
        editTodoForm.classList.remove('hidden');
        editTodoForm.appendChild(_createEditTodoForm(this));
    }

    function removeEditTodoForm() {
        const overlay = document.querySelector('.overlay-general');
        const editTodoForm = document.querySelector('.edit-todo-form');
        overlay.classList.add('hidden');
        editTodoForm.classList.add('hidden');
        _clearAllChilds(editTodoForm);
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

    function _getTodoContent() {
        const editTodoContainer = document.querySelector(
            '.edit-todo-container'
        );
        let todoContent = editTodoContainer.className
            .split(' ')[1]
            .split('edit-todo-container-')[1];
        todoContent = todoContent.replace(/-/g, ' ');
        return todoContent;
    }

    async function editTodo(e) {
        const todoInput = document.querySelector('.edit-todo-content-input');

        // If edited todo content is less than 3 characters prevent
        if (!myUtilityFunctions.isInputValidationCorrect(todoInput)) {
            myUtilityFunctions.showInputValidationError(todoInput);
            e.preventDefault();
            return;
        }
        // gets old content,new content and new date
        const todoContent = _getTodoContent();
        const updatedContent = document.querySelector(
            '.edit-todo-content-input'
        ).value;
        const updatedDate = document.querySelector(
            '.edit-todo-date-input'
        ).value;

        // edits usertodos
        myAccount.editUserTodo(
            myAccount.todos,
            todoContent,
            updatedContent,
            updatedDate
        );
        displayUserTodos();
        removeEditTodoForm();
        displayAddTodoButton(todosSection);

        // pushes todos to mock API
        myAccount.updateUserTodos(myAccount.username, myAccount.todos);
    }

    /////////////////////////////////////////////////////////////////////////////
    // DELETE TODOS
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

    /////////////////////////////////////////////////////////////////////////////
    // DISPLAY TODOS
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
        _clearAllChilds(todosSection);
    }

    function _clearAllChilds(el) {
        while (el.firstChild) {
            el.removeChild(el.lastChild);
        }
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
