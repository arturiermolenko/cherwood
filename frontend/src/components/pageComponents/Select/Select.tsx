import { useEffect, useState } from "react";
import "./Select.scss";
import Checkbox from '@mui/material/Checkbox';
import { Option } from "../../../helpers/Options";
import { getOptions } from "../../../api";
import { useAppSelector } from "../../../app/hooks";

export const Select = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [option, setOption] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const languageReducer = useAppSelector(state => state.language);

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    getOptions()
      .then((straviFromServer) => {
        setOption(straviFromServer);
      });
  }, []);

  const handleSelectClick = (select) => {
    setSelectedOption(select);
    setIsOpen(!isOpen);

    if (selectedOption === select) {
      setSelectedOption(null);
    }
  };

  const handleApplyClick = () => {
    setSelectedOption(null);
    setIsOpen(!isOpen);
  };

  return (
    <div className="select">
      {option.map((select) => (
        <div className="select__box" key={select.id}>
          <div
            className={`select__name ${selectedOption === select ? 'select__target' : ''}`}
            onClick={() => handleSelectClick(select)}
          >
            {languageReducer.language
              ? select.name_eng
              : select.name
            }
            <button 
              className={`select__button ${
                selectedOption === select ? 'select__button--target' : ''
                }`} 
            />
          </div>

          {isOpen && selectedOption === select && (
            <div className="select__container">
              <div className="select__top">
                <button
                  className="filter__cross"
                  onClick={() => handleApplyClick()}
                />
              </div>

              <form className="select__list">
                {select.subcategories.map((subcategory) => (
                  <label
                    key={subcategory.name}
                    htmlFor={subcategory.name}
                    className="select__checkbox"
                  >
                    <Checkbox
                      {...label}
                      style={{ color: '#1B998B' }}
                      aria-label={subcategory.name_eng}
                      id={subcategory.name}
                    />
                    <label className="select__text" htmlFor={subcategory.name}>
                      {languageReducer.language
                        ? subcategory.name_eng
                        : subcategory.name
                      }
                    </label>
                  </label>
                ))}

                <p className="select__flex">
                  <button
                    className="select__apply"
                    onClick={handleApplyClick}
                  >
                    {languageReducer.language
                      ? ('Apply')
                      : ("Застосувати")
                    }
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};