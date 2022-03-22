var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const URI = 'http://fathomless-woodland-31379.herokuapp.com/users';

const CreateAccountAPI = async (newAccount) => {
    
    var accountDetails = JSON.stringify({
        "user": newAccount
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: accountDetails,
        redirect: 'follow'
    };

    try {
        return await fetch(URI, requestOptions);
    } catch (error) {
        console.log(error);
    }
}

export default CreateAccountAPI;