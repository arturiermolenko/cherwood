import { useEffect, useState } from "react";
import { getChart, getCherwood } from "../../../api";
import { NavLink } from "react-router-dom";
import { Profile } from "../../pageComponents/Profile/Profile";
import "./Chart.scss"
import { BackButton } from "../../pageComponents/BackButton/BackButton";
import { useAppSelector } from "../../../app/hooks";
import { CardinChard } from "../../pageComponents/CardinChard/CardinChard";
import { CartItem } from "../../../helpers/ChartInterface";
import { Cherwood } from "../../../helpers/Cherwood";
import { Footer } from "../../pageComponents/Footer/Footer";
import { OrderForm } from "../../pageComponents/OrderForm/OrderForm";

export const Chart = () => {
  const [chart, setChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const [prev, setsetPrev] = useState(1);
  const [change, setChange] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const handleRemove = () => {
    setChange(!change)
  }

useEffect(() => {
  getChart()
  .then((userFromServer) => {
    setChart(userFromServer)
  })
}, [change]);

useEffect(() => {
  getCherwood()
  .then((userFromServer) => {
    setCherwood(userFromServer)
  })
}, []);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const inChart = cherwood.filter((product) => chart.products.some((productId) => productId.id === product.id));

  return (
    <div className="chart">
       {windowWidth < 780 &&(
        <div className="chart__header--top">
          <NavLink to='/' className="logo"/>
        </div>
       )}

      <header className="chart__header">
        {windowWidth > 780 &&(<NavLink to='/' className="logo"/>)}

        <div className="chart__header--cont">
          {registrationReducer.registration.access &&(
             <NavLink 
              to="/favorites" 
              className="header__favorites header__img"
            />
            )}

          <Profile />
        </div>
      </header>

      <div className="chart__top">
        <BackButton/>

        <p className="chart__page">
          {`${prev}/2`}
        </p>
      </div>

      {prev === 2 ?(
        <h2 className="chart__textHeader">
        {languageReducer.language 
          ?('Delivery contacts')
          :('Контакти доставки')
        }
      </h2>
      )
      :(
        <h2 className="chart__textHeader">
        {languageReducer.language 
          ?('Cart')
          :('Корзина')
        }
      </h2>
      )}
      
      {inChart.length > 0 ? (
        <>
       {prev === 2 ?(
        <OrderForm />
       ) 
      :(
      <div className="chart__items">
      {inChart.map((item) => (
        <CardinChard key={item.id} card={item} handleRemove={handleRemove}/>
      ))}
      
      <div className="chart__buttonContainer">
        <button 
          className="modal__button2 modal__button" 
          onClick={() => setsetPrev(2)}
        >
          {languageReducer.language ? 'Continue' : 'Продовжити'}
          <p className="modal__arrow" />
          </button>
        </div>
      </div>
      )}
        </>
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

    {windowWidth < 780 &&( <Footer />)}
    </div>
  );
}