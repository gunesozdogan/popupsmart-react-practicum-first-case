const account = (function () {
    let todos = [];
    let username;
    let id;
    let darkMode = false;
    const getUserTodos = async function (username) {
        try {
            const response = await fetch(
                `https://632498066f7a75f8b795c5fa.mockapi.io/todos?username=${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    mode: 'cors',
                }
            );

            // because mock api filter returns array
            const dataArr = await response.json();
            const data = dataArr[0];
            this.todos = data.todos;
            this.username = data.username;
            this.id = data.id;

            return data.todos;
        } catch (error) {
            console.log(error);
        }
    };

    const updateUserTodos = function (username, userTodos, userID) {
        const userData = {
            username,
            id: userID,
            todos: userTodos,
        };

        fetch(`https://632498066f7a75f8b795c5fa.mockapi.io/todos/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: 'cors',
            body: JSON.stringify(userData),
        });
    };

    const deleteUserTodo = function (userTodos, todoContent) {
        for (let i = 0; i < userTodos.length; i++) {
            if (userTodos[i].content === todoContent) {
                userTodos.splice(i, 1);
                break;
            }
        }

        return userTodos;
    };

    const switchCompleteUserTodo = function (userTodos, todoContent) {
        for (let i = 0; i < userTodos.length; i++) {
            if (userTodos[i].content === todoContent) {
                userTodos[i].isCompleted = userTodos[i].isCompleted
                    ? false
                    : true;
                break;
            }
        }
        return userTodos;
    };

    const getTodoDate = function (content, userTodos) {
        for (let i = 0; i < userTodos.length; i++) {
            if (userTodos[i].content === content) {
                return userTodos[i].date;
            }
        }
    };

    const Todo = function (content, date) {
        return { content, isCompleted: false, date };
    };

    const editUserTodo = function (
        userTodos,
        content,
        updatedContent,
        updatedDate
    ) {
        for (let i = 0; i < userTodos.length; i++) {
            if (userTodos[i].content === content) {
                userTodos[i].content = updatedContent;
                userTodos[i].date = updatedDate;
                break;
            }
        }
    };

    return {
        getUserTodos,
        deleteUserTodo,
        updateUserTodos,
        switchCompleteUserTodo,
        editUserTodo,
        getTodoDate,
        Todo,
        todos,
        username,
        id,
        darkMode,
    };
})();

export default account;
