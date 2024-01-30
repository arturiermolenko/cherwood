import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getBooking} from "../../../api";
import { Modal } from "../Modal/Modal";
import img from '../../../img/e547dbac650979a00cdb494fbc168463.jpg';

import "./HistoryLogic.scss"
import { NavLink } from "react-router-dom";
import { BookingItem } from "../../../helpers/BookingInterface";

export const HistoryLogic = () => {
  const [cherwood, setCherwood] = useState<BookingItem>();
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const hendlModal = () => {
    setIsSelect(!isSelect);
  } 

  console.log(cherwood)
  
  useEffect(() => {
    getBooking( 
       registrationReducer.registration.access 
      || registrationReducer.registration.refresh
      )
      .then((straviFromServer) => {
        setCherwood(straviFromServer);
      })
  }, []);


  return (
    <div className="historyLogic">
      <h1 className="historyLogic__header">
        {languageReducer.language 
          ? 'Reservations history'
          :'Історія бронювань'
        }
      </h1>

     {/* {cherwood.length > 0 ?
        cherwood.map(card => (
          <div className="historyLogic__chard cardinChard" key={card.id}>
            <img 
              src={img} 
              alt="cardImg" 
              className="cardinChard__img"
              onClick={hendlModal}
            />

            <div className="cardinChard__container historyLogic__container">
              <div className="cardinChard__top">
                <div className="cardinChard__name">
                  {languageReducer.language ? card.name : card.name_eng}
                </div>

                <div className="cardinChard__price">
                  {`₴${card.price}`}
                </div>
              </div>

              <div className="cardinChard___descr">
                <div className="modal__minicontainer2">
                  <p className="modal__type">
                    {languageReducer.language ? 'Length:' : 'Довжина:'}
                  </p>
                  <p className="modal__number">{card.length}</p>

                  <p className="modal__slash">/</p>

                  <p className="modal__type">
                    {languageReducer.language ? 'Wight:' : 'Bara:'}
                  </p>
                  <p className="modal__number">{card.width}</p>

                  <p className="modal__slash">/</p>

                  <p className="modal__type">
                    {languageReducer.language ? 'Height:' : 'Висота:'}
                  </p>
                  <p className="modal__number">{card.height}</p>
                </div>

                <div className="modal__minicontainer2">
                  <p className="modal__type">
                    {languageReducer.language ? 'Material:' : 'Матеріал:'}
                  </p>
                  <p className="modal__text">
                    {languageReducer.language ? card.material_eng : card.material}
                  </p>
                </div>
              </div>
            </div>

            {isSelect && <Modal card={card} hendlCloseModal={hendlModal} />}
          </div>
        ))
        : 
        <div className="historyLogic__empty">
          <p className="historyLogic__search"/>

          <h1 className="historyLogic__no">
            {languageReducer.language 
              ? 'There was no order'
              : 'Замовлень не було'
            }
          </h1>

          <NavLink to="/" className="modal__button2 modal__button">
            {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
            <p className="modal__arrow" />
          </NavLink>
        </div>
      } */}
    </div>
  );
}