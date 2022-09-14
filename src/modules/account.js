const account = (function () {
    let todos = [];
    let username;
    // Checks if username exists
    const doesUsernameExist = async function (username) {
        try {
            const response = await fetch(
                `https://631dbfab789612cd07afa22a.mockapi.io/todos/${username}`,
                { mode: "cors" }
            );

            return response.status !== 500 ? true : false;
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const getUserTodos = async function (username) {
        try {
            const response = await fetch(
                `https://631dbfab789612cd07afa22a.mockapi.io/todos/${username}`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    mode: "cors",
                }
            );

            if (response.status !== 500) {
                const data = await response.json();
                this.todos = data.todos;
                this.username = username;
                return data.todos;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUserTodo = function (userTodos, todoContent) {
        for (let i = 0; i < userTodos.length; i++) {
            if (userTodos[i].content === todoContent) {
                userTodos.splice(i, 1);
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
            }
        }
        return userTodos;
    };

    const updateUserTodos = function (username, userTodos) {
        const userData = {
            id: username,
            todos: userTodos,
        };

        fetch(`https://631dbfab789612cd07afa22a.mockapi.io/todos/${username}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            mode: "cors",
            body: JSON.stringify(userData),
        });
    };

    const createUserTodo = async function (
        username,
        content,
        isCompleted,
        date
    ) {
        return { content, isCompleted, date };
    };

    return {
        doesUsernameExist,
        getUserTodos,
        deleteUserTodo,
        updateUserTodos,
        switchCompleteUserTodo,
        todos,
        username,
    };
})();

export default account;
