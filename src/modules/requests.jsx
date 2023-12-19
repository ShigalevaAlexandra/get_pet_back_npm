const ProfileRequest = (profile, setProfile) => {
    fetch("https://pets.сделай.site/api/users", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setProfile(result);
        })
        .catch(error => console.log('error', error));
}

const RegisterRequest = (body, callback = () => {}) => {
    fetch("https://pets.сделай.site/api/register", { method: "POST", body: body })
        .then(response => response = response.status).then(result => {
        console.log(result);
        localStorage.setItem('token', null)
        callback(result)
    }).catch(error => console.log('error', error));
}

const FustSearchRequest = (query, card, setCard) => {
    console.log(`https://pets.сделай.site/api/search?query=${query}`);
    fetch(`https://pets.сделай.site/api/search?query=${query}`).then(response => response.json())
        .then(result => {
            console.log(result);
            setCard(result);
            console.log(card)
            console.log('qwerty')
        })
        .catch(error => console.log('error', error));
}

export {
    ProfileRequest,
    RegisterRequest,
    FustSearchRequest
};