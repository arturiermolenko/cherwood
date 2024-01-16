import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import classNames from "classnames";
import axios from "axios";
import { useState } from "react";

import "./LogInLogic.scss";

export const LogInLogic = () => {
  const languageReducer = useAppSelector((state) => state.language);
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleInputChange = (field, event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setValues({
      ...values,
      password: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', {
        email: values.email,
        password: values.password,
      });

      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', (error as any).response?.data);
    }
    console.log(values)
  };

  return (
    <div className="signUpLogic">
       <h1 className="signUpLogic__header">
        {languageReducer.language
          ? 'Log in'
          : 'Вхід'}
      </h1>

      <div className="signUpLogic__container">
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Email address*'
              : 'Адреса електронної пошти*'}
          </p>

          <input
            type="email"
            className="signUpLogic__input"
            placeholder={
              languageReducer.language
                ? 'Enter your email address'
                : 'Введіть вашу адресу електронної пошти'
            }
            value={values.email}
            onChange={(event) => handleInputChange('email', event)}
          />
        </div>

        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Password*'
              : 'Пароль*'}
          </p>

          <input
            type={values.showPassword ? 'text' : 'password'}
            className="signUpLogic__input"
            placeholder={
              languageReducer.language
                ? 'Enter your password'
                : 'Введіть пароль'
            }

            onChange={handlePasswordChange}
          />
          <button
            onClick={handleClickShowPassword}
            className={classNames('signUpLogic__button', {
              'signUpLogic__show': values.showPassword,
            })}
          />
        </div>

        <div className="logInLogic__container">
          <NavLink to="/forgot" className="logInLogic">
            Forgot your password
          </NavLink>
        </div>
      </div>

      <div className="signUpLogic__container">
        <button
          className='signUpLogic__green signUpLogic__button2'
          onClick={handleLogin}
        >
          {languageReducer.language
            ? 'Confirm'
            : 'Продовжити'}
        </button>

        <p className="signUpLogic__or">
          {languageReducer.language
            ? 'or'
            : 'або'}
        </p>

        <button className='signUpLogic__white signUpLogic__button2'>
          <p className='signUpLogic__google signUpLogic__img' />
          {languageReducer.language
            ? 'Sign up with Google'
            : 'Зареєструватися через Google'}
        </button>

        <button className='signUpLogic__white signUpLogic__button2'>
          <p className='signUpLogic__facebook signUpLogic__img' />
          {languageReducer.language
            ? 'Sign up with Facebook'
            : 'Зареєструватися через Facebook'}
        </button>
      </div>

      <div className="signUpLogic__container2">
        <div className="signUpLogic__text2">
          {languageReducer.language
            ? ' Don\'t have an account?'
            : 'Якщо немаєте акаунта?'}
        </div>

        <NavLink to='/singUp' className="signUpLogic__logIn">
          {languageReducer.language
            ? 'Sing up'
            : 'Зареєструватися'}
        </NavLink>
      </div>
    </div>
  );
}