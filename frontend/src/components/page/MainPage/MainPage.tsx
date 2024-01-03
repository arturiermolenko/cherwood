import { useEffect, useState } from "react";
import "./MainPage.scss";
import { Cherwood } from "../../../helpers/Cherwood";
import { getCherwood } from "../../../api";
import { Card } from "../../pageComponents/Card/Card";
import { Select } from "../../pageComponents/Select/Select";
import { Search } from "../../Search/Search";
import { CarouselOnPage } from "../../pageComponents/Carusel";
import { HomeInfo } from "../../pageComponents/HomeInfo/HomeInfo";


export const MainPage = () => {
    const [cherwood, setCherwood] = useState<Cherwood[]>([]);

    useEffect(() => {
        getCherwood()
          .then((straviFromServer) => {
            setCherwood(straviFromServer);
          })
      }, []);

  return (
    <div className="main">
      <div className="main__topOptions">
      <p className="main__miniContainer main__miniContainer--colum">
        <Select />
        <div className="main__watch">
          <div className="main__defolt">View all</div>
          <div className="main__shown">Showed 6 results</div>
        </div>
      </p>

      <p className="main__miniContainer">
        <Search />
        <a 
          href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
          className="main__insta" 
          target="_blank"
        />
      </p>
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