// Request Options Headers
var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    mode: 'cors'
};

const getUsers = async () => {
    try {
        const response = await fetch("https://fathomless-woodland-31379.herokuapp.com/users", requestOptions);
        const data = await response.json();

        return { data }
    } catch (err) {
        console.log(err);
    }
}

export default getUsers;