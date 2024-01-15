import { useAppSelector } from "../../../app/hooks";

import "./Delivery.scss";

export const Delivery = () => {
  const languageReducer = useAppSelector(state => state.language);
  return (
    <div className="delivery">
      <div className="delivery__container2">
        <div className="delivery__container">
          <h2 className="delivery__text">
            {languageReducer.language 
              ?('Easy to order')
              :('Легко замовити')
            }
          </h2>
          <p className="delivery__img delivery__delivery" />
        </div>

        <div className="delivery__container">
          <h2 className="delivery__text">
            {languageReducer.language 
              ?('Faster payment')
              :('Швидший платіж')
            }
          </h2>
          <p className="delivery__img delivery__pay" />
        </div>

        <div className="delivery__container">
          <h2 className="delivery__text">
            {languageReducer.language 
              ?('100% secure')
              :('100% безпека')
            }
          </h2>
          <p className="delivery__img delivery__secure" />
        </div>
      </div>
      
      <div className="delivery__container">
        <h2 className="delivery__text">
          {languageReducer.language 
            ?('We cooperate with the New post office')
            :('Ми співпрацюємо з Новою понтою відділенням.')
         }
        </h2>

        <div className="delivery__mimiCont">
          <p className="delivery__img delivery__newPost" />
          <p className="delivery__text">
            {languageReducer.language 
              ?('New Post')
              :('Нова пошта')
            }
          </p>
        </div>

      </div>
    </div>
  );
}