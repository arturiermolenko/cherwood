import { NavLink } from 'react-router-dom';
import "./Header.scss";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Filter } from '../Filter/Filter';
import { Profile } from '../Profile/Profile';
import { changeLanguageAction } from '../../../app/slice/LanguageSlice';

export const Header = () => {
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useAppDispatch();
  const languageReducer = useAppSelector(state => state.language);

  const handleLanguageChange = (isEnglish: boolean) => {
    dispatch(changeLanguageAction(isEnglish));
    setIsSelect(prevState => !prevState);
  };

    return (
    <div className="header">
      <div className="header__mainContainer">
          <NavLink
            to="/"
            className="logo"
          />

          <ul className="header__nav">
              <li>
                  <NavLink 
                    to="/pay"
                    className="header__nav--link"
                  >
                  {languageReducer.language 
                    ?('Delivery and payment')
                    :('Доставка та оплата')
                  }
                  </NavLink>
              </li>

              <li>
                  <NavLink 
                    to="/contacts"
                    className="header__nav--link"
                  >
                  {languageReducer.language 
                    ?('Contacts')
                    :('Контакти')
                  }
                  </NavLink>
              </li>

              <li>
                  <NavLink 
                    to="/aboutMe"
                    className="header__nav--link"
                  >
                  {languageReducer.language 
                    ?('About us')
                    :('Про нас')
                  }
                  </NavLink>
              </li>
          </ul>

          <div className="header__container">
            <div className="header__container header__container--row-reverse">
              <Filter />

              <NavLink 
                to="/chart" 
                className="header__chart header__img"
              >
                {/* {addProduct.length !== 0 && (
                  <div className="header__amount">
                    {addProduct.length}
                  </div>
                )} */}
                </NavLink>
            </div>

            <NavLink 
              to="/favorites" 
              className="header__favorites header__img"
            />

            <div className="header__cont">
              <div 
              className="header__languageContainer"
              onClick={() => setIsSelect(!isSelect)}
            >
              <div className="header__languages header__img"/>
              <div className="header__languages--select">
                {languageReducer.language ?(
                  <div className="header__languages--text">En</div>
                )
                :(
                  <div className="header__languages--text">Ua</div>
                )}
                <button className="header__languages--button header__img"/>
              </div>
            </div>

            {isSelect &&(
              <ul className="header__list">
                {languageReducer.language ?(
                    <li 
                    className="header__select"
                    onClick={() => handleLanguageChange(false)}
                  > Українська
                  </li>
                )
                :(
                  <li 
                   className="header__select"
                   onClick={() => handleLanguageChange(true)}
                 > English
                 </li>
                 
                )}
              </ul>
              )}
            </div>
            <Profile />
          </div>
        </div>
    </div>
  );
}