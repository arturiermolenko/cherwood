import { useState } from "react";
import "./Select.scss";
import Checkbox from '@mui/material/Checkbox';

export const Select = () => {
  const [isSelect, setIsSelect] = useState(false);
  const label = { inputProps: {'aria-label': 'Checkbox demo'} };

  return (
    <div className="select">
      <div 
        className="select__name"
        onClick={() => setIsSelect(!isSelect)}
      > Kitchens
       <button className="select__button"/>
      </div>

    {isSelect &&(
      <form className="select__list">
        <label htmlFor="html" className="select__select">
          <Checkbox 
            {...label} 
            style={{ color: '#1B998B' }}
            aria-label="English"
            id="checkID"
          />
             <label className="select__text" htmlFor="checkID">English</label>
      </label>

      <label htmlFor="html" className="select__select">
          <Checkbox 
            {...label} 
            style={{ color: '#1B998B' }}
            aria-label="English"
            id="checkID2"
          />
            <label className="select__text" htmlFor="checkID2">Adfgveg</label>
      </label>

      <p className="select__flex">
        <button className="select__apply">Apply</button>
      </p>
    </form>
      )}
  </div>
 );
}