const accounts = function () {
    const doesUsernameExist = async function (username) {
        try {
            const response = await fetch(
                `https://631dbfab789612cd07afa22a.mockapi.io/todos/${username}`
            );

            return response.status !== 500 ? true : false;
        } catch (error) {
            console.log(error);
            return;
        }
    };

    return { doesUsernameExist };
};

export default accounts;
