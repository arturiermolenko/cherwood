import React, { useState } from "react";
import { Cherwood } from "../../../helpers/Cherwood.js";
import "./Card.scss";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../../../app/hooks";
import { LikeAndChart } from "../LikeAndChart/LikeAndChart";
import img from "../../../img/e547dbac650979a00cdb494fbc168463.jpg"

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
      <div className="card">
        <div className="card__top">
          <img 
            className="card__img" 
             src={img} 
            alt="img" 
            onClick={hendlModal}
          />

          <LikeAndChart id={cherwood.id}/>
        </div>

      <div className="card__header" onClick={hendlModal}>
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