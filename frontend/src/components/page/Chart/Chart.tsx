import { useEffect, useState } from "react";
import { getChart, getCherwood } from "../../../api";
import { Cherwood } from "../../../helpers/Cherwood";
import { NavLink } from "react-router-dom";
import { Profile } from "../../pageComponents/Profile/Profile";
import "./Chart.scss"
import { BackButton } from "../../pageComponents/BackButton/BackButton";
import { useAppSelector } from "../../../app/hooks";
import { CardinChard } from "../../pageComponents/CardinChard/CardinChard";

export const Chart = () => {
  const [chart, setChart] = useState<Cherwood[]>([])
  const [prev, setsetPrev] = useState(1);
  const languageReducer = useAppSelector(state => state.language);


useEffect(() => {
  // getChart()
  // .then((userFromServer) => {
  //   setChart(userFromServer)
  // })

  getCherwood()
  .then((userFromServer) => {
    setChart(userFromServer)
  })
}, []);

  return (
    <div className="chart">
      <header className="chart__header">
        <NavLink to='/' className="logo"/>

        <div className="chart__header--cont">
          <NavLink 
            to="/favorites" 
            className="header__favorites header__img"
         />

          <Profile />
        </div>
      </header>

      <div className="chart__top">
        <BackButton/>

        <p className="chart__page">
          {`${prev}/2`}
        </p>
      </div>

      <h2 className="chart__textHeader">
        {languageReducer.language 
          ?('Cart')
          :('Корзина')
        }
      </h2>
      
      {chart.length > 0 ? (
        <div className="chart__items">
          {chart.map((item) => (
          <CardinChard key={item.id} card={item}/>
        ))}
        </div>
   
        ) : (
      <div className="chart__container">
        <p className="chart__no" />

        <h1 className="chart__bigText">
          {languageReducer.language ? (
            'There are no products in the cart'
          ) : (
            'У кошику немає товарів'
          )}
        </h1>
        <h3 className="chart__miniText">
          {languageReducer.language ? (
            'Look at our catalog, you will definitely find something'
          ) : (
            'Перегляньте наш каталог, ви обов\'язково знайдете щось цікаве'
          )}
        </h3>

        <NavLink to="/" className="modal__button2 modal__button">
          {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
          <p className="modal__arrow" />
        </NavLink>
      </div>
    )}
    </div>
  );
}