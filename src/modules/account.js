const accounts = function () {
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
                        "Content-type": "application/json",
                    },
                    mode: "cors",
                }
            );

            if (response.status !== 500) {
                const data = await response.json();
                return data.todos;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { doesUsernameExist, getUserTodos };
};

export default accounts;
