export let getAuthData = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export let getUserID = () => {
    return getAuthData().hasura_id;
}

export let getAuthHeader = () => {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getAuthData().auth_token,
    }
}

export let getLoginProivderData = () => {
    return JSON.parse(localStorage.getItem('userAuth'));
};

export let getProfileData = () => {
    let Data = getLoginProivderData();
    return {
        "name": Data._profile.name,
        "email": Data._profile.email,
        "profilepic": Data._profile.profilePicURL
    }
};