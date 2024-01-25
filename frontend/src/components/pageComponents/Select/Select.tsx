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
  const [isSelect, setIsSelect] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    setIsSelect(!isSelect);
    setSelectedOption(null);
  };

  const isClearSearch = () => {
    setIsSelect(!isSelect);
    setSearchQuery(getSearchWith(searchQuery, { tupe: null }));
    setSelectedOptions([]);
    setSelectedOption(null);
  }

  const [openSubcategories, setOpenSubcategories] = useState<number[]>([]);

  const handleSelectClick = (selected: Option) => {
    setSelectedOption(selected);

    const isOpen = openSubcategories.includes(selected.id);

    setOpenSubcategories((prev) =>
      isOpen ? prev.filter((id) => id !== selected.id) : [...prev, selected.id]
    );

    if (selected === selectedOption && isOpen) {
      setSelectedOption(null);
    }
  };

  return (
    <div className="select">
      <div className="select__img--box">
        <button 
          className="select__img--container"
          onClick={() => setIsSelect(!isSelect)}
        >
          <p className="select__img"/>
        </button>

        {windowWidth < 780 &&(
        <h3 className="select__img--text">
          {languageReducer.language 
            ?('Filters')
            :('Фільтри')
          }
        </h3>
        )}
      </div>

      {isSelect &&(
      <div className="select__box">
        <div className="select__top">
          <h1 className="filter__header">
            {languageReducer.language 
              ?('Filters')
              :('Фільтри')
            }
          </h1>

          <button
            className="filter__cross"
            onClick={isClearSearch}
          />
        </div>
        {option.map((select) => (
          <div key={select.id} className="select__box--container">
            <div
              className='select__name'
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

            {selectedOption === select && (
              <div className="select__container">
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
                </form>
              </div>
            )}
            </div>
          ))}
          {isSelect &&(
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
          </p>)}
      </div>
      )}
    </div>
  );
};