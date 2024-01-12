import { NavLink} from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import "./InfoLogic.scss"
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { scrollToFooter } from "../../../helpers/helpers";
import { Grid } from "../Grid/Grid";
import { Delivery } from "../Delivery/Delivery";

type Props = {
  tex1: string | JSX.Element,
  tex1_eng: string | JSX.Element,
  tex2: string | JSX.Element,
  tex2_eng: string | JSX.Element,
  grid: boolean,
};

export const InfoLogic: React.FC<Props> = ({tex1, tex1_eng, tex2, tex2_eng, grid}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const languageReducer = useAppSelector(state => state.language);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


   const isActiveNav = ({ isActive }: { isActive: boolean }) => classNames(
    'aboutUs__nav--link', { aboutUs__active: isActive },
  );

  return (
    <div className="aboutUs">
      <div className="aboutUs__heaedr">
        <NavLink
          to="/"
          className="logo aboutUs__index"
        />

        <ul className="aboutUs__nav">
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
              className={isActiveNav}
            >
            {languageReducer.language 
              ?('About us')
              :('Про нас')
            }
            </NavLink>
          </li>

          <li>
              <NavLink 
                to="/pay"
                className={isActiveNav}
              >
              {languageReducer.language 
                ?('Delivery and payment')
                :('Доставка та оплата')
              }
              </NavLink>
          </li>
        </ul>

        <a className="aboutUs__button" href="/">
          <p className="aboutUs__arrow" />
          <h5 className="aboutUs__button--text">
            {languageReducer.language 
              ?('back')
              :('назад')
            }
          </h5>
        </a>
      </div>

      <div className="aboutUs__container">
          <div className="aboutUs__container2">
          <h1 className="aboutUs__mainHeader">
            CherWood pack
          </h1>
          <div className="aboutUs__descr">
          {
            languageReducer.language
              ? tex1
              : tex1_eng
          }
          </div>

          <div className="aboutUs__descr">
          {
            languageReducer.language
              ? tex2
              : tex2_eng
          }
          </div>
        </div>

          {grid 
            ?(<Grid />)
            :(<Delivery/>)
          }
        </div>

      <footer className="aboutUs__footer" id="footer">
      <NavLink
          to="/"
          className="logo footer__none"
        />
        <div className="footer__mainContainer">
          <div className="footer__container">
            <a 
              href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
              className="aboutUs__text aboutUs__instCont"
              target="_blank"
            >
              {languageReducer.language 
                ? `More about the arpenter${'\u2019'}s activities on Instagram`
                : 'Більше інформації про діяльність столяра на Instagram'
              }
            
            <p className="aboutUs__insta footer__img"/>
            </a>

            <a
              target="_blank"
              href="tel:+38 (093) 170 78 67"
              className="aboutUs__text">
                <p className="aboutUs__phone footer__img"/>
                +38 (093) 170 78 67
            </a>
          </div>

          <div className="footer__container2">
            <div className="footer__miniContainer">
              <NavLink
                to="/"
                className="footer__text aboutUs__text2"
              > 
                {languageReducer.language 
                  ?('About us')
                  :('Про нас')
                }
              </NavLink>

              {windowWidth < 780 && (
                <NavLink to="/pay" className="footer__text aboutUs__text2">
                  {languageReducer.language 
                    ? ('Delivery and pay')
                    : ('Доставка та оплата')
                  }
                </NavLink>
              )}
              <a 
                target="_blank"
                href="https://maps.app.goo.gl/Wi33AmYgTRsN23vb8"
                className="footer__text aboutUs__text2"
              >
              {languageReducer.language 
                  ?('Location')
                  :('Локація')
                }
              <p className="footer__locationImg footer__img aboutUs__location"/>
            </a>
          </div>

          <a 
            href="mailto:romanlapicak@gmail.com"
            className="footer__gmail footer__text aboutUs__text--gmail"
            target="_blank"
          >
            <p className="footer__gmail--img footer__img aboutUs__gmail"/>
              romanlapicak@gmail.com
            </a>
          </div>
        </div>
      </footer>
      <div className="aboutUs__trapezoid" />
    </div>
  );
}