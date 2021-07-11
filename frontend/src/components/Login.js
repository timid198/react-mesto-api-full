import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Login({handleLogin}) {

    const [data, setData] = useState({
        password: '',
        email: '',
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!data.password || !data.email) {
            return
        }
        const { password, email } = data;
        handleLogin({password, email});
    }
    return(
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <AuthForm data={data} handleChange={handleChange} />
                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;