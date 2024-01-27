import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { UserType } from "../../../helpers/UserType";

import "./OrderForm.scss";
import { getUser } from "../../../api";
import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router";
import regian from "../../../oblasts.json";

export const OrderForm = () => {
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType>();
  const [firstName, setFirstName] = useState<string | undefined>(user?.first_name || '');
  const [lastName, setLastName] = useState<string | undefined>(user?.last_name || '');
  // const [country, setCountry] = useState<string | undefined>(user?.country || '');
  // const [city, setCity] = useState<string | undefined>(user?.city || '');
  // const [region, setRegion] = useState<string | undefined>(user?.region || '');
  const [email, setEmail] = useState<string | undefined>(user?.email || '');
  const [telNumber, setTelNumber] = useState<string | undefined>(user?.tel_number || '');
  const [selectedRegion, setSelectedRegion] = useState(
    languageReducer.language ? 'Select region' : 'Виберіть вашу область'
  );
  const [isSelect, setIsSelect] = useState(false);
  const [errors, setErrors] = useState({
    tel_number: '',
    tel_numberUkr: '',
  });
  
  const handleNumber = (e) => {
    setTelNumber(e.target.value);
    setErrors({
      tel_number: '',
      tel_numberUkr: '',
    });
  };

  const handleToggleSelect = () => setIsSelect((prev: boolean) => !prev);

  const handleRegionClick = (region): void => {
    setSelectedRegion(region);
    handleToggleSelect();
  };

  useEffect(() => {
    if (registrationReducer.registration.access 
      || registrationReducer.registration.refresh
      ) {
      getUser(registrationReducer.registration.access 
        || registrationReducer.registration.refresh
        )
      .then((userFromServer) => {
        setUser(userFromServer)
      })
    }
  }, [
    registrationReducer.registration.access,
    registrationReducer.registration.refresh
  ]);

  useEffect(() => {
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    // setCountry(user?.country || '');
    // setCity(user?.city || '');
    // setRegion(user?.region || '');
    setEmail(user?.email || '');
    setTelNumber(user?.tel_number || '');
  }, [user]);

  const handleConfirm = async () => {
    try {
  
      const url = 'http://127.0.0.1:8000/api/order/create/';
  
      const orderData = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: telNumber,
      };
  
      await axios.post(url, orderData);

      if (registrationReducer.registration.access 
        || registrationReducer.registration.refresh
        )  {
          const updatedUser = await getUser(
            registrationReducer.registration.access ||
            registrationReducer.registration.refresh 
          );
          setUser(updatedUser);
        }

      navigate('/success')
    } catch (error) {
      console.error(error);
      setErrors({
        tel_number: 'Invalid number, it must be 13 digits',
        tel_numberUkr: 'Некоректний номер, повинно бути 13 цифр',
      });
    }
  };


  return (
    <div className="orderForm">
      <div className="orderForm__header">
       {languageReducer.language 
          ?('Contacts')
          :('Контакти')
        }
      </div>


      <div className="orderForm__container">
        <div className="profileLogic__inputBox">
          <div className="signUpLogic__miniContainer">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'First name*'
                : 'Ім\'я*'}
            </p>
          
            <label
              className="signUpLogic__miniContainer"
              htmlFor="searchInput"
            >
            <input
              type="text"
              className="signUpLogic__input"
              placeholder={
                languageReducer.language
                  ? 'Enter your email first name'
                  : 'Введіть ваше ім\'я'
              }
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          </div>

          <div className="signUpLogic__miniContainer">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Last name*'
                : 'Призвіще*'}
            </p>
          
            <label
                className="signUpLogic__miniContainer"
                htmlFor="searchInput"
              >
              <input
                type="text"
                className="signUpLogic__input"
                placeholder={
                  languageReducer.language
                    ? 'Enter your email last name'
                    : 'Введіть ваше прізвище'
                }
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          
          <div className="signUpLogic__miniContainer">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Your country*'
                : 'Ваша країна*'}
            </p>
          
          <label
              className="signUpLogic__miniContainer"
              htmlFor="searchInput"
            >
            <input
              type="text"
              className="signUpLogic__input"
              placeholder={
                languageReducer.language
                  ? 'Enter your country'
                  : 'Введіть вашу країну'
              }
            />
          </label>
          </div>

          <div className="signUpLogic__miniContainer signUpLogic__miniContainer--box">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Your region*'
                : 'Вашу область*'}
            </p>
          
          <button
              className="signUpLogic__miniContainer signUpLogic__input signUpLogic__input--box"
              onClick={handleToggleSelect}
            > 
            {selectedRegion}
            </button>

            {isSelect && (
                <ul className="orderForm__regionCont">
                  {regian.map(item => (
                    <li 
                      key={item} 
                      className="orderForm__region"
                      onClick={() => handleRegionClick(item)}
                    >
                      {item}
                    </li>
                    )
                  )}
                </ul>
              )}
          </div>
          
          <div className="signUpLogic__miniContainer">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Your city*'
                : 'Ваше місто*'}
            </p>

            <label
              className="signUpLogic__miniContainer"
              htmlFor="searchInput"
            >
              <input
                type="text"
                className="signUpLogic__input"
                placeholder={
                  languageReducer.language
                    ? 'Enter your city'
                    : 'Введіть ваше місто'
                }
              />
            </label>
          </div>

          <div className="signUpLogic__miniContainer">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Contact number*'
                : 'Номер телефону*'}
            </p>
        
          <label
              className="signUpLogic__miniContainer"
              htmlFor="searchInput"
            >
            <input
              type="tel"
              name="phone"
              pattern="\+[0-9]{1,4}\s?[0-9]{1,14}"
              className={classNames("signUpLogic__input", {
                'signUpLogic__error': errors.tel_number,
              })}
              placeholder='38 000 000 000 00'
              value={telNumber}
              onChange={handleNumber}
            />
              
          {errors.tel_number && (
            <div className="signUpLogic__errorText">
                {
                languageReducer.language 
                ? errors.tel_number
                : errors.tel_numberUkr
              }
            </div>
            )}
          </label>
        </div>

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
                type="gmail"
                className="signUpLogic__input"
                placeholder={
                  languageReducer.language
                    ? 'Enter your email address'
                    : 'Введіть адресу вашої електронної пошти'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

        <div className="profileLogic__warning" >
          {
            languageReducer.language
              ? 'We will be contacted to clarify payment and delivery*'
              : 'З нами зв\'яжуться для уточнення оплати та доставки*'
          }
        </div>

          <button
            className="
              signUpLogic__green 
              signUpLogic__button2
              signUpLogic__button2
            "
            onClick={handleConfirm}
          >
          {
            languageReducer.language
              ? 'Confirm'
              : 'Продовжити'
          }
          </button>
      </div>
      </div>
    </div>
  );
}