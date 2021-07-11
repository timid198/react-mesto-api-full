import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({handleRegister, clear}) {

    const [data, setData] = useState({
        password: '',
        email: '',
    })

    React.useEffect(() => {
        setData({password: '', email: ''})
      }, [clear]); 

    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        let { password, email } = data;
        console.log(password, email)
        handleRegister({password, email})
    }

    return(
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <AuthForm data={data} handleChange={handleChange} />    
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <p className="register__content">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></p>
        </div>
    )
}

export default Register;