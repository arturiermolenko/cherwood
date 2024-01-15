import img1 from "../../../img/img1.jpg";
import img2 from "../../../img/img2.jpg";
import img3 from "../../../img/img3.jpg";
import img4 from "../../../img/img4.jpg";
import img5 from "../../../img/img5.jpg";
import img6 from "../../../img/e547dbac650979a00cdb494fbc168463.jpg";
import img7 from "../../../img/homeee.jpg";

import "./Grid.scss"

export const Grid = () => {
  return (
    <div className="grid__bigContainer">
    <div className="grid">
      <div className="grid__item grid__item--desctop-4-4">
          <div className="place__photo-container">
          <img src={img5} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>
        <div className="grid__item grid__item--desctop-1-1">
          <div className="place__photo-container">
            <img src={img1} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>

        <div className="grid__item grid__item--desctop-2-2">
          <div className="place__photo-container">
          <img src={img2} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>

        <div className="grid__item grid__item--desctop-3-3">
          <div className="place__photo-container">
          <img src={img3} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>

        <div className="grid__item grid__item--desctop-4-4">
          <div className="place__photo-container">
          <img src={img7} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>

        <div className="grid__item grid__item--desctop-1-1">
          <div className="place__photo-container">
          <img src={img4} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>

        <div className="grid__item grid__item--desctop-3-3">
          <div className="place__photo-container">
          <img src={img6} alt="img" className="grid__img place__photo--position"/>
          </div>
        </div>
      </div>
    </div>

  );
}