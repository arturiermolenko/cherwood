import React from "react";
import { Cherwood } from "../../../helpers/Cherwood";
import "./Modal.scss";
import { BackButton } from "../BackButton/BackButton";
import { Slide } from "react-slideshow-image";

import innn from "../../../img/e547dbac650979a00cdb494fbc168463.jpg"

type Props = {
  card: Cherwood,
  hendlCloseModal: () => void; 
};

const arrowButtons = {
  prevArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--prev
      "
  >
    {' '}
  </button>,

  nextArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--next
      "
  >
    {' '}
  </button>,
};

export const Modal: React.FC<Props> = ({ card, hendlCloseModal }) => {
   return (
    <div className="modal">
      <div className="modal__background">
        <div className="modal__top">
        <BackButton hendlCloseModal={hendlCloseModal}/>
        <button 
          className="filter__cross"
          onClick={hendlCloseModal} 
        />
        </div>

      <div className="modal__carousel">
        <Slide {...arrowButtons} duration={5000} indicators>
            {card.images.map((photo, index) => (
              <div key={index} className="each-slide">
                <img 
                  src={innn} 
                  className={`modal__slide`} 
                />
              </div>
            ))}
        </Slide>
      </div>

        <div className="modal__header">
          <div className="modal__minicontainer">
            <button className="modal__like" />
            <button className="modal__chart" />
          </div>

          <div className="card__header">
            <h1 className="modal__name">{card.name}</h1>
            <p className="modal__price">{`₴ ${card.price}`}</p>
          </div>

          <button className="modal__button">Buy now</button>
        </div>

        <div className="modal__descr">
          <div className="modal__minicontainer2">
            <p className="modal__type">
              Description:
            </p>
            <p className="modal__text">{card.description}</p>
          </div>

          <div className="modal__minicontainer2">
            <p className="modal__type">
              Length:
            </p>
            <p className="modal__number">{card.length}</p>

            <p className="modal__slash">/</p>

            <p className="modal__type">
              Wight:
            </p>
            <p className="modal__number">{card.width}</p>

            <p className="modal__slash">/</p>

            <p className="modal__type">
              Height:
            </p>
            <p className="modal__number">{card.height}</p>
          </div>

          <div className="modal__minicontainer2">
            <p className="modal__type">
              Material:
            </p>
            <p className="modal__text">{card.material}</p>
          </div>
        </div>

        <div className="modal__together">
          <h1 className="modal__together--header">Together with this they buy</h1>
        </div>
      </div>
    </div>
   );
}