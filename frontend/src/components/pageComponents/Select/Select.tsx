import { useEffect, useState } from "react";
import "./Select.scss";
import Checkbox from '@mui/material/Checkbox';
import { Option } from "../../../helpers/Options";
import { getOptions } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../../helpers/helpers";


export const Select = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [option, setOption] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const languageReducer = useAppSelector(state => state.language);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    getOptions()
      .then((straviFromServer) => {
        setOption(straviFromServer);
      });
  }, []);

  const handleCheckboxChange = (subcategoryNameEng: string) => {
    const updatedOptions = selectedOptions.includes(subcategoryNameEng)
      ? selectedOptions.filter((option) => option !== subcategoryNameEng)
      : [...selectedOptions, subcategoryNameEng];

    setSelectedOptions(updatedOptions);
  };

  const submitForm = () => {
    const searchParams = new URLSearchParams();
    selectedOptions.forEach((option) => {
      searchParams.append('selectedOptions', option);
    });
  
    const queryString = searchParams.toString();
  
    setSearchQuery(getSearchWith(searchQuery, { tupe: queryString || null }));
    setIsOpen(!isOpen);
    setSelectedOption(null);
  };

  const handleSelectClick = (selected) => {
    setSelectedOption(selected);
    setIsOpen(!isOpen);

    console.log(isOpen, selected)

    if (selected === selectedOption) {
      setSelectedOption(null);
    }
  };

  const isClearSearch = () => {
    setIsOpen(!isOpen);
    setSearchQuery(getSearchWith(searchQuery, { tupe: null }));
    setSelectedOptions([]);
    setSelectedOption(null);
  }

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
                  onClick={isClearSearch}
                />
              </div>

              <form className="select__list">
                {select.subcategories.map((subcategory) => (
                  <label
                    key={subcategory.name_eng}
                    htmlFor={subcategory.name_eng}
                    className="select__checkbox"
                    onChange={() => handleCheckboxChange(subcategory.name_eng)}
                  >
                    <Checkbox
                      {...label}
                      style={{ color: '#1B998B' }}
                      aria-label={subcategory.name_eng}
                      id={subcategory.name_eng}
                      checked={selectedOptions.includes(subcategory.name_eng)}
                    />
                    <label className="select__text" htmlFor={subcategory.name_eng}>
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
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    {languageReducer.language
                      ? ('Apply')
                      : ("Застосувати")
                    }
                  </button>

                  <button
                    className="select__cancel"
                    onClick={(e) => {
                      e.preventDefault();
                      isClearSearch();
                    }}
                  >
                    {languageReducer.language
                      ? ('Cancel all')
                      : ("Скасувати все")
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