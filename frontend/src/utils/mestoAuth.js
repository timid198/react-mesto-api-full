export const BASE_URL = 'http://api.azannik.nomoredomains.rocks/';

const checkResponse = (res) => {res.ok ? res.json() : Promise.reject()};

export const register = (password, email) => {
    return fetch (`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then((res) => checkResponse(res));
}

export const authorize = (password, email) => {
    return fetch (`${BASE_URL}signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then((res) => checkResponse(res));
}

export const getContent = (token) => {
    return fetch (`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(checkResponse);
}