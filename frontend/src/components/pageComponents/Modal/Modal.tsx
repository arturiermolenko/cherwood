import React, { useEffect, useState } from "react";
import { Cherwood } from "../../../helpers/Cherwood";
import "./Modal.scss";
import { BackButton } from "../BackButton/BackButton";
import { Slide } from "react-slideshow-image";

import innn from "../../../img/e547dbac650979a00cdb494fbc168463.jpg"
import { useAppSelector } from "../../../app/hooks";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { getCherwood } from "../../../api";
import { Card } from "../Card/Card";

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
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const languageReducer = useAppSelector(state => state.language);

useEffect(() => {
  getCherwood()
  .then((straviFromServer) => {
    setCherwood(straviFromServer);
  })
}, []);

  const togetherBuy = cherwood.filter((item) => card.buying_with_it.includes(item.id));

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const shouldShow = screenWidth <= 780;

   return (
    <div className="modal">
      <div className="modal__background">
        {shouldShow && <Header />}
        <div className="modal__top">
        <BackButton hendlCloseModal={hendlCloseModal}/>
        <button 
          className="filter__cross cross__none"
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
            <h1 className="modal__name">
              {languageReducer.language 
                ?card.name_eng
                :card.name
              }
            </h1>
            <p className="modal__price">{`₴ ${card.price}`}</p>
          </div>

          <button className="modal__button">
            {languageReducer.language 
              ?('Buy now')
              :("Купити зараз")
            }
          </button>
        </div>

        <div className="modal__descr">
          <div className="modal__minicontainer2">
            <p className="modal__type">
            {languageReducer.language 
              ?('Description:')
              :("Опис:")
            }
            </p>
            <p className="modal__text">
              {languageReducer.language 
                ?card.description_eng
                :card.description
              }
            </p>
          </div>

          <div className="modal__minicontainer2">
            <p className="modal__type">
            {languageReducer.language 
              ?('Length:')
              :("Довжина:")
            }
            </p>
            <p className="modal__number">{card.length}</p>

            <p className="modal__slash">/</p>

            <p className="modal__type">
            {languageReducer.language 
              ?('Wight:')
              :("Bara:")
            }
             
            </p>
            <p className="modal__number">{card.width}</p>

            <p className="modal__slash">/</p>

            <p className="modal__type">
            {languageReducer.language 
              ?('Height:')
              :("Висота:")
            }
            </p>
            <p className="modal__number">{card.height}</p>
          </div>

          <div className="modal__minicontainer2">
            <p className="modal__type">
            {languageReducer.language 
              ?('Material:')
              :("Матеріал:")
            }
            </p>
            <p className="modal__text">
            {languageReducer.language 
              ?card.material_eng
              :card.material
            }
            </p>
          </div>
        </div>
 
        <div className="modal__together">
          <h1 className="modal__together--header">
            {languageReducer.language 
              ?('Together with this item buy')
              :("Разом з ними товарами купують")
            }
          </h1>

          <div className="modal__together--card">
            {togetherBuy.map(item => (
              <Card cherwood={item} key={item.id}/>
            ))}
          </div>
        </div>

        {shouldShow && <Footer />}
      </div>
    </div>
   );
}