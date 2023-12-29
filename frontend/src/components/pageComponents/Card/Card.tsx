import React from "react";
import { Cherwood } from "../../../helpers/Cherwood.js";
import "./Card.scss";

type Props = {
  cherwood: Cherwood,
}

export const Card: React.FC<Props> = ({ cherwood }) => {
//   const [isSelect, setIsSelect] = useState(false);

//   const hendlCloseModal = () => {
//     setIsSelect(false);
// }

// const hendlOpenModal = (stravi) => {
//   setIsSelect(true);
  
// }

//   const handlKeyDown = (event) => {
//     if (event.code === "Escape") {
//       hendlCloseModal();
//     }
//   };


//  const handlBackdropClick = (event) => {
//    if (event.currentTarget === event.target) {
//      hendlCloseModal();
//    }
//  }

//  useEffect(() => {
//     window.addEventListener("keydown", handlKeyDown);

//     return () => {
//      window.removeEventListener("keydown", handlKeyDown);
//    };

//  }, [])

  return (
    <>
      <div className="card">
        <div className="card__top">
          <img 
            className="card__img" 
            // src={cherwood.main_image} 
            alt="img" 
          />
          <div className="card__minicontainer">
            <button className="card__like" />
            <button className="card__chart" />
          </div>
        </div>

      <div className="card__header">
        <h1 className="card__name">{cherwood.name}</h1>
         <p className="card__price">{`₴ ${cherwood.price}`}</p>
      </div>
    </div>

    {/* {isSelect &&(<Modal card={stravi}/>)} */}
  </>
  );
}