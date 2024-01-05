import { useState } from "react";

import "./Filter.scss";
import { useAppSelector } from "../../../app/hooks";

export const Filter = () => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div className="filter">
    <button 
      className="filter__img"
      onClick={() => setIsSelect(!isSelect)}
    />

    {isSelect &&(
      <div className="filter__container">
        <div className="filter__top">
          <h1 className="filter__header">
          {languageReducer.language 
              ?('Filters')
              :('Фільтри')
            }
          </h1>
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
            {languageReducer.language 
              ?('Recommended to you')
              :('Рекомендовано для вас')
            }
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option2"
              className="filter__radio" 
            />
            {languageReducer.language 
              ?('The cheapest')
              :('Найдешевші')
            }
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option3" 
              className="filter__radio" 
            />
            {languageReducer.language 
              ?('The most expensive')
              :('Найдорожчі')
            }
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="option3" 
              className="filter__radio" 
          />
            {languageReducer.language 
              ?('The newest')
              :('Найновіші')
            }
          </label>
        </form>

        <div className="filter__buttonContainer">
          <button className="filter__button">
            {languageReducer.language 
              ?('Apply')
              :('Застосувати')
            }
          </button>
          <button className="filter__button">
            {languageReducer.language 
              ?('Cancel all')
              :('Скасувати все')
            }
          </button>
        </div>
      </div>
      )}
  </div>
  );
}