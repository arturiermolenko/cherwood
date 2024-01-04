import { useState } from "react";

import "./Filter.scss";

export const Filter = () => {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <div className="filter">
    <button 
      className="filter__img"
      onClick={() => setIsSelect(!isSelect)}
    />

    {isSelect &&(
      <div className="filter__container">
        <div className="filter__top">
          <h1 className="filter__header">Filters</h1>
          <button 
            className="filter__cross"
            onClick={() => setIsSelect(!isSelect)}
          />
        </div>
        <form className="filter__form">
          <label className="filter__label">
            <input 
              type="radio"
              className="filter__radio" 
              value='option1'
            />
            Recommended to you
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option2"
              className="filter__radio" 
            />
            Recommended to you
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option3" 
              className="filter__radio" 
            />
            Recommended to you
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option3" 
              className="filter__radio" 
          />
            The newest
          </label>
        </form>

        <div className="filter__buttonContainer">
          <button className="filter__button">Apply</button>
          <button className="filter__button">Cancel all</button>
        </div>
      </div>
      )}
  </div>
  );
}