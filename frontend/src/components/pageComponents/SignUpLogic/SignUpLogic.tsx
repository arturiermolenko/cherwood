import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import "./SignUpLogic.scss";
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const SignUpLogic = () => {
  const languageReducer = useAppSelector((state) => state.language);
  const [errors, setErrors] = useState({
    email: [] as string[],  
    password: [] as string[], 
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,
    showPassword2: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
    });
  };

  const handleInputChange = (field, event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });

    setErrors({
      email: [],  
      password: [], 
    });
  };

  const handlePasswordChange = (event) => {
    setValues({
      ...values,
      password: event.target.value,
    });

    setErrors({
      email: [],  
      password: [], 
    });
  };

  const handleConfimPasswordChange = (event) => {
    setValues({
      ...values,
      confirm_password: event.target.value,
    });

    setErrors({
      email: [],  
      password: [], 
    });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/user/register/', {
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });

    } catch (error) {
      setErrors({
        email: (error as any).response?.data.email || [],
        password: (error as any).response?.data.password || [],
      });

      console.log('Registration failed222', (error as any).response?.data)
    }
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
              ? 'Email address*'
              : 'Адреса електронної пошти*'}
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          
          <input
            type="email"
            className={classNames("signUpLogic__input", {
              'signUpLogic__error': errors.email.length > 0,
            })}
            placeholder={
              languageReducer.language
                ? 'Enter your email address'
                : 'Введіть вашу адресу електронної пошти'
            }
            value={values.email}
            onChange={(event) => handleInputChange('email', event)}
          />
          {errors.email.length > 0 &&(<p className="signUpLogic__cross signUpLogic__crossEmail" />)}
        </label>
        
        { errors.email.length > 0 && (
            <ul className="signUpLogic__errorList">
              {errors.email.map((errorMessage, index) => (
                <li key={index} className="signUpLogic__errorText">
                  {languageReducer.language ? errorMessage : 'Password error message'}
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Password*'
              : 'Пароль*'}
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          
          <input
            type={values.showPassword ? 'text' : 'password'}
            className={classNames("signUpLogic__input", {
              'signUpLogic__error': errors.password.length > 0,
            })}
            placeholder={
              languageReducer.language
                ? 'Enter your password'
                : 'Введіть пароль'
            }
            onChange={handlePasswordChange}
          />

        {errors.password.length > 0 &&(<p className="signUpLogic__cross" />)}
        
        <button
            onClick={handleClickShowPassword}
            className={classNames('signUpLogic__button', {
              'signUpLogic__show': values.showPassword,
            })}
          />
        </label>

        {errors.password.length > 0 && (
            <ul className="signUpLogic__errorList">
              {errors.password.map((errorMessage, index) => (
                <li key={index} className="signUpLogic__errorText">
                  {languageReducer.language ? errorMessage : 'Password error message'}
                </li>
              ))}
            </ul>
          )}
      </div>

        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Сonfirm password*'
              : 'Підтвердьте пароль*'
            }
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
            <input
              type={values.showPassword2 ? 'text' : 'password'}
              className={classNames("signUpLogic__input", {
                'signUpLogic__error': errors.password.length > 0,
              })}
              placeholder={
                languageReducer.language
                  ? 'Enter your password'
                  : 'Введіть пароль'
              }

              onChange={handleConfimPasswordChange}
            />

          {errors.password.length > 0 &&(<p className="signUpLogic__cross" />)}

          <button
            onClick={handleClickShowPassword2}
            className={classNames('signUpLogic__button', {
              'signUpLogic__show': values.showPassword2,
            })}
          />
        </label>

           { errors.password.length > 0 && (
            <ul className="signUpLogic__errorList">
              {errors.password.map((errorMessage, index) => (
                <li key={index} className="signUpLogic__errorText">
                  {languageReducer.language ? errorMessage : 'Password error message'}
                </li>
              ))}
            </ul>
          )}
        </div>
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