class Api {
    constructor({ address, token, groupID }) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
    }


    _checkPromise(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getCards() {
        return fetch(`${this._address}v1/${this._groupID}/cards`, {
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => this._checkPromise(res))
    }

    getUserData() {
        return fetch(`${this._address}v1/${this._groupID}/users/me`, {
            headers: {
                authorization: `${this._token}`
            }
        })

            .then(res => this._checkPromise(res))
    }

    pushUserData(data) {
        return fetch(`${this._address}v1/${this._groupID}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
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
        return fetch(`${this._address}v1/${this._groupID}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
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
        return fetch(`${this._address}v1/${this._groupID}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(response => response.ok
                ? Promise.resolve('sucsess')
                : Promise.reject(`Ошибка ${response.status}`))
    }

    changeCardsLikes(id, isLike) {
        const status = isLike ? 'DELETE' : 'PUT';
        return fetch(`${this._address}v1/${this._groupID}/cards/likes/${id}`, {
            method: status,
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => this._checkPromise(res))
    }

    changeAvatar(avatar) {
        return fetch(`${this._address}v1/${this._groupID}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
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
    address: 'https://mesto.nomoreparties.co/',
    token: '4f64f170-2de3-4b0f-8592-8133023e0f4d',
    groupID: 'cohort-22',
  })

export default api;