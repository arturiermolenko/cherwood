import { NavLink } from "react-router-dom";

import "./Footer.scss"

export const Footer = () => {

  return (
      <div className="footer">
        <NavLink
          to="/"
          className="logo"
        />
        <div className="footer__container">
          <a 
            href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
            className="footer__insta"
            target="_blank"
          >
           More about the artist's activities on Instagram
          <p className="footer__insta--img footer__img"/>
          </a>

          <a
            target="_blank"
            href="tel:+38 (093) 170 78 67"
            className="footer__phone">
              <p className="footer__phone--img footer__img"/>
             +38 (093) 170 78 67
          </a>
        </div>

        <div className="footer__container2">
          <div className="footer__miniContainer">
            <NavLink
              to="/"
              className="footer__text"
            > About us 
            </NavLink>

            <a
              target="_blank"
              href="https://maps.app.goo.gl/Wi33AmYgTRsN23vb8"
              className="footer__text"
            >
            Location
            <p className="footer__locationImg footer__img"/>
          </a>
        </div>

        <a 
          href="mailto:romanlapicak@gmail.com"
          className="footer__gmail"
          target="_blank"
        >
          <p className="footer__gmail--img footer__img"/>
          romanlapicak@gmail.com
        </a>
        </div>
      </div>
  );
}