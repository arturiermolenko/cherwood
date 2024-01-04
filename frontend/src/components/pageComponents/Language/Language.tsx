import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Language.scss";

export const Language = () => {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <div className="language__cont">
    <div 
      className="language__languageContainer"
      onClick={() => setIsSelect(!isSelect)}
    >
    <div className="language__languages language__img"/>
  </div>

  {isSelect &&(
    <div className="language__list">
      <div className="language__top">
        <button 
          className="filter__cross"
          onClick={() => setIsSelect(!isSelect)}
        />
      </div>

      <ul className="language__listContainer">
        <li className="language__select"> 
        <NavLink to="profile" className="language__option">
          <p className="language__img language__sing"/>
          <div className="language__text">Sing up</div>
        </NavLink>
        </li>
        <li className="language__select">
          <NavLink to="profile" className="language__option language__option--noBorder">
            <p className="language__img language__logIn"/>
            <div className="language__text">Log in</div>
          </NavLink>
        </li>
      </ul>
    </div>
   )}
  </div>
  );
}