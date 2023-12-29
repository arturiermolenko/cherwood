import React, { useEffect, useState } from "react";

import './HomePageLogic.scss';

// import cn from 'classnames';

// type Props = {
//   stravi: Stravi[],
//   filter: FilterBy,
//   header: string,
//   descr: string,
// }

export const HomePageLogic = ({ 
  // stravi,
  // filter, 
  // header,
  // descr,
}) => {
  // const [startIndex, setStartIndex] = useState(0);
  // const [visibleCardCount, setVisibleCardCount] = useState(3);

  // const handlePrevClick = () => {
  //   setStartIndex((prev) => Math.max(0, prev - 1));
  // };

  // const handleNextClick = () => {
  //   setStartIndex((prev) => Math.min(
  //     prev + 1, stravi.length - visibleCardCount,
  //   ));
  // };

  // const updateVisibleCardCount = () => {
  //   const newVisibleCardCount = window.innerWidth <= 1024 ? 1 : 3;

  //   setVisibleCardCount(newVisibleCardCount);
  // };

  // useEffect(() => {
  //   updateVisibleCardCount();
  //   window.addEventListener('resize', updateVisibleCardCount);

  //   return () => {
  //     window.removeEventListener('resize', updateVisibleCardCount);
  //   };
  // }, []);

  // const newPr = getFilteredStravi(stravi, filter);
  // const visibleCards = newPr.slice(startIndex, startIndex + visibleCardCount);

  // const prevDisables = startIndex === 0;
  // const nextDisables = startIndex === newPr.length - visibleCardCount;

    return (
        // <div className="straviLogic">
        //     <div className="straviLogic__container">
        //         <h1 className="straviLogic__header">
        //             {header}
        //         </h1>
        //         <h2 className="straviLogic__descr">
        //           {descr}
        //         </h2>
        //     </div>
{/* 
          {!(newPr.length < 4) &&( <div>
            <button
              type="button"
              onClick={handlePrevClick}
              disabled={prevDisables}
              className={cn('sliderButton sliderButton--prev', {
                disabled: prevDisables,
              })}
            >
              {' '}
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              disabled={nextDisables}
              className={cn('sliderButton sliderButton--next', {
                disabled: nextDisables,
              })}
            >
              {' '}
            </button>
          </div>
        )} */}

        //      <div className="straviLogic__miniContainer">
        //         {visibleCards.map((card) => (
        //           <StraviCard key={card.id} stravi={card} />
        //         ))}
        //     </div> 
        // </div>
    );
}