import { NavLink } from 'react-router-dom';
import "./Header.scss";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setLanguage } from '../../../action/action';
import { Filter } from '../Filter/Filter';
import { Language } from '../Language/Language';

export const Header = () => {
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useAppDispatch();
  const languageReducer = useAppSelector(state => state.language.booleanValue);

  const handleLanguageChange = (isEnglish: boolean) => {
    dispatch(setLanguage(isEnglish));
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
                    Delivery and pay
                  </NavLink>
              </li>

              <li>
                  <NavLink 
                    to="/contacts"
                    className="header__nav--link"
                  >
                    Contacts
                  </NavLink>
              </li>

              <li>
                  <NavLink 
                    to="/aboutMe"
                    className="header__nav--link"
                  >
                    About me
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
                {languageReducer ?(
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
                <li 
                  className="header__select"
                  onClick={() => handleLanguageChange(false)}
                > Ukraine
                </li>
                <li 
                  className="header__select"
                  onClick={() => handleLanguageChange(true)}
                > English
                </li>
              </ul>
              )}
            </div>
            
            <Language />
          </div>
        </div>
    </div>
  );
}