import React from "react";
import { Cherwood } from "../../../helpers/Cherwood";
import "./Modal.scss";

type Props = {
  card: Cherwood,
};

export const Modal: React.FC<Props> = ({ card }) => {
   return (
    <div className="modal">
      <div className="modal__top">
          <div className="modal__img">
            <button className="modal__cross" />
          </div>
        </div>

        <div className="modal__header">
            <h1 className="modal__name">{card.name}</h1>
            <p className="modal__category">{card.category}</p>
        </div>

        <h2 className="modal__descr">{card.description}</h2>
    </div>
   );
}