import "./HomeInfo.scss";

export const HomeInfo = () => {
  return (
    <div className="homeInfo">
      <div className="homeInfo__flex">
        <div className="homeInfo__img homeInfo__img--1"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">DESKPASS INSTANT WORKSPACE</p>
          <div className="homeInfo__bigText">
            Instantly reserve desks, conference rooms, or a private office
          </div>
        </div>
      </div>

      <div className="homeInfo__rowReverse">
        <div className="homeInfo__img homeInfo__img--2"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">DESKPASS TEAMS</p>
          <div className="homeInfo__bigText">
            Easily launch and manage a complete hybrid work strategy
          </div>
        </div>
      </div>

      <div className="homeInfo__flex">
        <div className="homeInfo__img homeInfo__img--3"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">OUR MISSION IS SIMPLE</p>
          <div className="homeInfo__bigText">
            Integrate existing offices into your flexible work benefits program
          </div>
        </div>
      </div>
    </div>
  );
}