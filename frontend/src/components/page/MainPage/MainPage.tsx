import { useEffect, useMemo, useState } from "react";
import "./MainPage.scss";
import { Cherwood } from "../../../helpers/Cherwood";
import { getCherwood } from "../../../api";
import { Card } from "../../pageComponents/Card/Card";
import { Select } from "../../pageComponents/Select/Select";
import { Search } from "../../pageComponents/Search/Search";
import { CarouselOnPage } from "../../pageComponents/Carusel";
import { HomeInfo } from "../../pageComponents/HomeInfo/HomeInfo";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { getFilteredCherwood } from "../../../helpers/FilteredCherwood";
import { NotFoundSearch } from "../../pageComponents/NotFoundSearch/NotFoundSearch";
import { Header } from "../../pageComponents/Header/Header";
import { Footer } from "../../pageComponents/Footer/Footer";

const imagePerRow = 6;

export const MainPage = () => {
const [cherwood, setCherwood] = useState<Cherwood[]>([]);
const [next, setNext] = useState(imagePerRow);
const [searchQuery] = useSearchParams();
const languageReducer = useAppSelector(state => state.language);

useEffect(() => {
  getCherwood()
    .then((straviFromServer) => {
      setCherwood(straviFromServer);
    })
}, []);

const tupe = searchQuery.get('tupe')|| '';;
const filter = searchQuery.get('filter')|| '';
const search = searchQuery.get('query')|| '';

let stateCard = useMemo(() => {
  let newCard = cherwood;

  if (tupe !== '') {
    const searchParams = new URLSearchParams(tupe);
    const selectedOptions = Array.from(searchParams.getAll("selectedOptions"));

    const result = selectedOptions
      .map(option => option.split('+'))
      .flat()
      .map(decodeURIComponent)
      .map(term => term.toLowerCase());

    newCard = cherwood.filter((product) => {
      const productWords = product.subcategory_name_eng.toLowerCase().split(' ');

      return result.some((term) => productWords.includes(term));
    });
  }

  if (filter !== '') {
    const searchTerms = filter.toLowerCase().trim().split(' ');
    const extractedString = searchTerms[0];

    newCard = getFilteredCherwood(newCard, extractedString);
  }

  if (search !== '') {
  const searchTerms = search.toLowerCase().trim().split(' ');

  newCard = cherwood.filter((product) => {
    let productWords: string[] = [];

    if (languageReducer.language) {
       productWords = product.name_eng.toLowerCase().split(' ');
    } else {
      productWords = product.name.toLowerCase().split(' ');
    }
    const ddd = searchTerms.every((term) => productWords
      .some((word) => word.includes(term)));

      return ddd;
  });
  }

  return newCard;
}, [tupe, filter, cherwood, search]);

const handleMoreImage = () => {
  setNext(next + imagePerRow);
  console.log(stateCard)
};

  return (
    <>
    <Header />
    <div className="main">
      <div className="main__topOptions">
      <div className="main__miniContainer main__miniContainer--colum">
        <Select />

        <div className="main__watch">
          <div 
            className="main__defolt" 
            onClick={() =>setNext(15)}
          >
            {languageReducer.language 
              ?('View all')
              :('Подивитись все')
            }
          </div>
          <div className="main__shown">
          {languageReducer.language 
              ?(`Showed ${stateCard.slice(0, next).length} results`)
              :(`Показано ${stateCard.slice(0, next).length} результатів`)
            }
          </div>
        </div>
      </div>

      <div className="main__miniContainer">
        <Search />
        <a 
          href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
          className="main__insta" 
          target="_blank"
        />
      </div>
      </div>

      {stateCard.length > 0
      ?(<div className="main__cardContainer">
        {stateCard.slice(0, next).map(prod => (
          <Card cherwood={prod} key={prod.id}/>
        ))}
      </div>)
      :(<NotFoundSearch />)}
      
      <div className="main__buttonContainer">
      {next < stateCard?.length && (
        <button 
          className="main__button" 
          onClick={handleMoreImage}
        >
           {languageReducer.language 
             ?('Show more')
             :('Показати більше')
           }
         </button>
        )}
    
      </div>
   

      <CarouselOnPage />

      <HomeInfo />
    </div>
    <Footer />
    </>
  );
}