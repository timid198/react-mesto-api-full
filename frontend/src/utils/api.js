class Api {
    constructor({ address }) {
        this._address = address;
    }


    _checkPromise(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            credentials: 'include',
        })
            .then(res => this._checkPromise(res))
    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
        })
            .then(res => this._checkPromise(res))
    }

    pushUserData(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                about: `${data.about}`,
            })
        })

            .then(res => this._checkPromise(res))
    }

    pushAddCardData(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                link: `${data.link}`,
            })
        })

            .then(res => this._checkPromise(res))
    }

    deleteCard(id) {
        return fetch(`${this._address}/${id}/cards`, {
            method: 'DELETE',        
        })
            .then(response => response.ok
                ? Promise.resolve('sucsess')
                : Promise.reject(`Ошибка ${response.status}`))
    }

    changeCardsLikes(id, isLike) {
        const status = isLike ? 'DELETE' : 'PUT';
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: status,
        })
            .then(res => this._checkPromise(res))
    }

    changeAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: `${avatar}`
            })
        }
        )
            .then(res => this._checkPromise(res))
    }
}

const api = new Api({
    address: 'http://api.azannik.nomoredomains.rocks',
  })

export default api;