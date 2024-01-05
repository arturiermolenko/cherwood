import { useEffect, useState } from "react";
import "./MainPage.scss";
import { Cherwood } from "../../../helpers/Cherwood";
import { getCherwood } from "../../../api";
import { Card } from "../../pageComponents/Card/Card";
import { Select } from "../../pageComponents/Select/Select";
import { Search } from "../../Search/Search";
import { CarouselOnPage } from "../../pageComponents/Carusel";
import { HomeInfo } from "../../pageComponents/HomeInfo/HomeInfo";
import { useAppSelector } from "../../../app/hooks";


export const MainPage = () => {
    const [cherwood, setCherwood] = useState<Cherwood[]>([]);
    const languageReducer = useAppSelector(state => state.language);

useEffect(() => {
  getCherwood()
    .then((straviFromServer) => {
      setCherwood(straviFromServer);
    })
}, []);

  return (
    <div className="main">
      <div className="main__topOptions">
      <div className="main__miniContainer main__miniContainer--colum">
        <Select />

        <div className="main__watch">
          <div className="main__defolt">
            {languageReducer.language 
              ?('View all')
              :('Подивитись все')
            }
          </div>
          <div className="main__shown">
          {languageReducer.language 
              ?('Showed 6 results')
              :('Показано 6 результатів')
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

      <div className="main__cardContainer">
        {cherwood.map(prod => (
          <Card cherwood={prod} key={prod.id}/>
        ))}
      </div>

      <CarouselOnPage />

      <HomeInfo />
    </div>
  );
}