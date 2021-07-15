export const BASE_URL = 'http://api.azannik.nomoredomains.rocks/';

const checkResponse = (response) => response.ok ? response.json() : Promise.reject();

export const register = (password, email) => {
    return fetch (`${BASE_URL}signup`, {
        method: 'POST',        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then(checkResponse);
}

export const authorize = (password, email) => {
    return fetch (`${BASE_URL}signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({password, email})
    })
    .then();
}

export const getContent = () => {
    return fetch (`${BASE_URL}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.send());
}