import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Profile.scss";
import { useAppSelector } from "../../../app/hooks";

export const Profile = () => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div className="profile__cont">
    <div 
      className="profile__languageContainer"
      onClick={() => setIsSelect(!isSelect)}
    >
    <div className="profile__languages profile__img"/>
  </div>

  {isSelect &&(
    <div className="profile__list">
      <div className="profile__top">
        <button 
          className="filter__cross"
          onClick={() => setIsSelect(!isSelect)}
        />
      </div>

      <ul className="profile__listContainer">
        <li className="profile__select"> 
        <NavLink to="profile" className="profile__option">
          <p className="profile__img profile__sing"/>
          <div className="profile__text">
          {languageReducer.language 
            ?('Sing up')
            :('Peєcтpaцiя')
          }
          </div>
        </NavLink>
        </li>
        <li className="profile__select">
          <NavLink to="profile" className="profile__option profile__option--noBorder">
            <p className="profile__img profile__logIn"/>
            <div className="profile__text">
              {languageReducer.language 
                ?('Log in')
                :('Увійти')
              }
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
   )}
  </div>
  );
}