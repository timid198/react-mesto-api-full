import React from 'react';

function AuthForm({data, handleChange}) {
    return (
        <fieldset className="login__fieldset">
            <input value={data.email} onChange={handleChange} type="email" name="email" className="login__input login__input_email" placeholder="Email" minLength="2" maxLength="40" required />
            <span className="login__error login__error_email" id="email-error"> </span>
            <input value={data.password} onChange={handleChange} type="password" name="password" className="login__input login__input_password" placeholder="Пароль" minLength="2" maxLength="40" required />
            <span className="login__error login__error_password" id="password-error"> </span>
        </fieldset>
    )
}

export default AuthForm;