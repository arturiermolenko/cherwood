import { NavLink, useLocation } from "react-router-dom";
import { BackButton } from "../BackButton/BackButton";
import './ProfileLogic.scss'
import { useAppSelector } from "../../../app/hooks";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { UserType } from "../../../helpers/UserType";
import { getUser } from "../../../api";

export const ProfileLogic = () => {
  const [user, setUser] = useState<UserType>();

  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const location = useLocation();

  const isActiveNav = ({ isActive }: { isActive: boolean }) => classNames(
    'profileLogic__link', { profileLogic__active: isActive },
  );

  useEffect(() => {
    getUser(registrationReducer.registration.access)
    .then((userFromServer) => {
      setUser(userFromServer)
    })
  }, []);

  return (
    <div className="profileLogic">
      <header className="profileLogic__header">
        <NavLink to='/' className="logo"/>

        <div className="chart__header--cont">
          <NavLink className="header__chart--cont" to="/chart" >
            <div 
              className="header__chart header__img"
            >
            {/* {addProduct.length !== 0 && (
              <div className="header__amount">
                {addProduct.length}
              </div>
            )} */}
            </div>
          </NavLink>

          <NavLink 
            to="/favorites" 
            className="header__favorites header__img"
          />
        </div>
      </header>
      <BackButton />

      <div className="profileLogic__container">
        <div className="profileLogic__nav">
          <NavLink to='/profile' className={isActiveNav}>
          <p className={classNames("profileLogic__profile header__img", {
             'profileLogic__profile-active': location.pathname === '/profile' 
            })} 
          />
            {
              languageReducer.language 
                ?('Profile')
                :('Профіль')
            }
          </NavLink>

          <NavLink to='/payment' className={isActiveNav}>
            <p className={classNames("profileLogic__payment header__img", {
              'profileLogic__payment-active': location.pathname === '/payment' 
              })} 
            />
            {
              languageReducer.language 
                ?('Payment')
                :('Платіж')
            }
          </NavLink>

          <NavLink to='/history' className={isActiveNav}>
            <p className={classNames("profileLogic__history header__img", {
             'profileLogic__history-active': location.pathname === '/history' 
            })} 
          />
            {
              languageReducer.language 
                ?('Reservations history')
                :('Історія бронювань')
            }
          </NavLink>

          <div className="profileLogic__link">
            <p className="profileLogic__logout header__img" />
            {
              languageReducer.language 
                ?('Logout')
                :('Вийти')
            }
          </div>
        </div>

        <div className="profileLogic__mainContainer">
          <h1 className="profileLogic__headerText">
            My Profile
          </h1>

        <div className="profileLogic__miniCont">
          <p className="profileLogic__profileImg header__img"/>

            <div className="profileLogic__info">
              <div className="profileLogic__name">
                {`${user?.last_name} ${user?.first_name}`}
              </div>

              <div className="profileLogic__location">
                City
              </div>

              <div className="profileLogic__phone">
                +38 098 755 55 91
              </div>
            </div>
        </div>

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
                    ? 'Enter your email second name'
                    : 'Введіть ваше прізвище'
                }
              />
            </label>
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
              type="text"
              className="signUpLogic__input"
              placeholder={
                languageReducer.language
                  ? 'Enter your country'
                  : 'Введіть ваше країну'
              }
            />
          </label>
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
                ? 'Password*'
                : 'Пароль*'}
            </p>
            
              <label
                  className="signUpLogic__miniContainer"
                  htmlFor="searchInput"
                >
                <input
                  type="tel"
                  name="phone"
                  pattern="\+[0-9]{1,4}\s?[0-9]{1,14}"
                  className="signUpLogic__input"
                  placeholder='+38 000 000 000 00'
                />
              </label>
            </div>
              <button className="signUpLogic__green signUpLogic__button2">
              {
                languageReducer.language
                  ? 'Confirm'
                  : 'Продовжити'
              }
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}