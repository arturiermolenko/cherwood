import { useAppSelector } from "../../../app/hooks";
import { Cherwood } from "../../../helpers/Cherwood";
import img from '../../../img/e547dbac650979a00cdb494fbc168463.jpg';
import "./CardinChard.scss";

type Props = {
  card: Cherwood;
}

export const CardinChard: React.FC<Props> = ({card}) => {
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div className="cardinChard">
      <img src={img} alt="cardImg" className="cardinChard__img"/>

    <div className="cardinChard__container">
      <div className="cardinChard__top">
          <div className="cardinChard__name">
          {languageReducer.language 
              ? card.name
              :card.name_eng
            }
          </div>

          <div className="cardinChard__price">
          {`₴${card.price}`}
          </div>
        </div>

        <div className="cardinChard___descr">
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

          <div className="cardinChard__count">
            <div className="cardinChard__count--button">
              <button className="cardinChard__count--button--minus" />
                <p className="cardinChard__count--button--count">1</p>
                <button className="cardinChard__count--button--plus" />
            </div>

            <button className="cardinChard__count--remove">
              <p className="cardinChard__count--remove--dump" />
              <h2 className="cardinChard__count--remove--text">
                {languageReducer.language 
                  ?('Remove')
                  :("Видалити")
                }
              </h2>
            </button>
          </div>
      </div>
    </div>
  );
}