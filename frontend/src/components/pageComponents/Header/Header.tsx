import { NavLink } from 'react-router-dom';
import "./Header.scss";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Filter } from '../Filter/Filter';
import { Profile } from '../Profile/Profile';
import { changeLanguageAction } from '../../../app/slice/LanguageSlice';
import { scrollToFooter } from '../../../helpers/helpers';
import { getChart } from '../../../api';
import { CartItem } from '../../../helpers/ChartInterface';

export const Header = () => {
  const [isSelect, setIsSelect] = useState(false);
  const [chart, setChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useAppDispatch();

  const languageReducer = useAppSelector(state => state.language);
  const chartReload = useAppSelector(state => state.chart);
  const registrationReducer = useAppSelector(state => state.registration);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLanguageChange = (isEnglish: boolean) => {
    dispatch(changeLanguageAction(isEnglish));
    setIsSelect(prevState => !prevState);
  };

  useEffect(() => {
    getChart()
    .then((chartData) => {
      setChart(chartData);
    })
    .catch((error) => {
      console.error(error);
    });
}, [chartReload.chart]);

    return (
    <div className="header">
      <div className="header__mainContainer">
          <NavLink
            to="/"
            className="logo"
          />

          <ul className="header__nav">
              <li>
                  <NavLink 
                    to="/pay"
                    className="header__nav--link"
                  >
                  {languageReducer.language 
                    ?('Delivery and payment')
                    :('Доставка та оплата')
                  }
                  </NavLink>
              </li>

              <li>
                  <p 
                    className="header__nav--link"
                    onClick={scrollToFooter}
                  >
                  {languageReducer.language 
                    ?('Contacts')
                    :('Контакти')
                  }
                  </p>
              </li>

              <li>
                  <NavLink 
                    to="/aboutUs"
                    className="header__nav--link"
                  >
                  {languageReducer.language 
                    ?('About us')
                    :('Про нас')
                  }
                  </NavLink>
              </li>
          </ul>

          <div className="header__container">
            <div className="header__container header__container--row-reverse">
              <Filter />

             {windowWidth < 780 &&( 
             <a 
              href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
              className="main__insta" 
              target="_blank"
            />)}

              <NavLink className="header__chart--cont" to="/chart" >
                <div 
                  className="header__chart header__img"
                >
                {chart.products.length !== 0 && (
                  <div className="header__amount">
                    {chart.products.length}
                  </div>
                )}
                </div>
              </NavLink>
            </div>

            {(registrationReducer.registration.access || registrationReducer.registration.refresh) && (
              <NavLink to="/favorites" className="header__favorites header__img" />
            )}

            <div className="header__cont">
              <div 
              className="header__languageContainer"
              onClick={() => setIsSelect(!isSelect)}
            >
              <div className="header__languages header__img"/>
              <div className="header__languages--select">
                {languageReducer.language ?(
                  <div className="header__languages--text">En</div>
                )
                :(
                  <div className="header__languages--text">Ua</div>
                )}
                <button className="header__languages--button header__img"/>
              </div>
            </div>

            {isSelect &&(
              <ul className="header__list">
                {languageReducer.language ?(
                    <li 
                    className="header__select"
                    onClick={() => handleLanguageChange(false)}
                  > Українська
                  </li>
                )
                :(
                  <li 
                   className="header__select"
                   onClick={() => handleLanguageChange(true)}
                 > English
                 </li>
                 
                )}
              </ul>
              )}
            </div>
            <Profile />
          </div>
        </div>
    </div>
  );
}