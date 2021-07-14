export const BASE_URL = 'http://api.azannik.nomoredomains.rocks/';

const checkResponse = (response) => response.ok ? response.json() : Promise.reject();

export const register = (password, email) => {
    return fetch (`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then((res) => {
        res.ok ? res.json() : Promise.reject();
    });
}

export const authorize = (password, email) => {
    return fetch (`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then((res) => {
        res.ok ? res.send() : Promise.reject();
    });
}

export const getContent = (token) => {
    return fetch (`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then((res) => {
        res.ok ? res.json() : Promise.reject();
    });
}