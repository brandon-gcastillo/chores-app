// Headers Object
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const URI = "http://fathomless-woodland-31379.herokuapp.com/sessions";

const authenticateUser = async (emailValue, passwordValue) => {

    var raw = JSON.stringify({
        "user": {
            "email": emailValue,
            "password": passwordValue
        }
    })

    // Request Options
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    try {
        const response = await fetch(URI, requestOptions);
        const data = await response.json();

        const statusValue = JSON.stringify(response.status)

        return {statusValue, data};
    } catch(err) {
        console.log(err)
    }
}

export default authenticateUser;