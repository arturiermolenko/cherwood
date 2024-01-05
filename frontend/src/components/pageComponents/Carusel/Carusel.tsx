import { useEffect, useState } from 'react';
import './Carusel.scss';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Cherwood } from '../../../helpers/Cherwood';
import { getCherwood } from '../../../api';

import imh from "../.././../img/homeee.jpg"
import { useAppSelector } from '../../../app/hooks';

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

export const CarouselOnPage = () => {
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const languageReducer = useAppSelector(state => state.language);
  const isMobile = window.innerWidth <= 640;
 
  useEffect(() => {
      getCherwood()
        .then((straviFromServer) => {
          setCherwood(straviFromServer);
        })
    }, []);
  return (
    <div className="carousel">
      <h2 className="carousel__title">
        {languageReducer.language 
          ?('Recommended products')
          :('Рекомендовані товари')
        }
      </h2>

     <Slide {...arrowButtons} duration={5000} indicators={!isMobile}>
      {cherwood.map((photo) => (
        <div key={photo.id} className="each-slide">
          <img 
            src={imh} 
            className={`carousel__slide`} 
            alt={`Slide ${photo.id}`}
          />

          <button className='carousel__add'>
            {languageReducer.language 
              ?('Add to cart +')
              :('Додати до кошика +')
            }
          </button>
        </div>
        ))}
      </Slide>
    </div>
  );
};
