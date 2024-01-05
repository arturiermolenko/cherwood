import React, { useState } from "react";
import { Cherwood } from "../../../helpers/Cherwood.js";
import "./Card.scss";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../../../app/hooks";

type Props = {
  cherwood: Cherwood,
}

export const Card: React.FC<Props> = ({ cherwood }) => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);

  const hendlModal = () => {
    setIsSelect(!isSelect);
}
  return (
    <>
      <div className="card" onClick={hendlModal}>
        <div className="card__top">
          <img 
            className="card__img" 
            // src={cherwood.main_image} 
            alt="img" 
          />
          <div className="card__minicontainer">
            <button className="card__like" />
            <button className="card__chart" />
          </div>
        </div>

      <div className="card__header">
        <h1 className="card__name">
          {languageReducer.language 
            ?cherwood.name_eng
            :cherwood.name
          }
        </h1>
         <p className="card__price">{`₴ ${cherwood.price}`}</p>
      </div>
    </div>

    {isSelect &&(<Modal card={cherwood} hendlCloseModal={hendlModal}/>)}
  </>
  );
}