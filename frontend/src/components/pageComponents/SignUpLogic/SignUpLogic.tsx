import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import "./SignUpLogic.scss";
import classNames from 'classnames';
import { Checkbox } from '@mui/material';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const SignUpLogic = () => {
  const languageReducer = useAppSelector((state) => state.language);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register', {
        // fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', (error as any).response?.data);
    }
    console.log(values)
  };

  return (
    <div className="signUpLogic">
      <h1 className="signUpLogic__header">
        {languageReducer.language
          ? 'Sign up'
          : 'Peєcтpaцiя'}
      </h1>

      <div className="signUpLogic__container">
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Full name*'
              : 'Ім\'я і призвіще*'}
          </p>

          <input
            type="text"
            className="signUpLogic__input"
            placeholder={
              languageReducer.language
                ? 'Enter your full name'
                : 'Введіть ваше ім\'я і призвіще'
            }
            value={values.fullName}
            onChange={(event) => handleInputChange('fullName', event)}
          />
        </div>

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

        <label className="signUpLogic__checkbox">
          <Checkbox
            {...label}
            style={{ color: '#1B998B' }}
            defaultChecked
          />
          <label className="signUpLogic__text2">
            {languageReducer.language
              ? 'Keep my login'
              : 'Запам\'ятати мій логін'}
          </label>
        </label>
      </div>

      <div className="signUpLogic__container">
        <button
          className='signUpLogic__green signUpLogic__button2'
          onClick={handleRegistration}
        >
          {languageReducer.language
            ? 'Create Account'
            : 'Створити обліковий запис'}
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
            ? 'Already have an account?'
            : 'Вже маєте обліковий запис?'}
        </div>

        <NavLink to='/logIn' className="signUpLogic__logIn">
          {languageReducer.language
            ? 'Log in'
            : 'Увійти'}
        </NavLink>
      </div>
    </div>
  );
};