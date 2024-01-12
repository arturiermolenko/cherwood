import {
    Routes,
    Route,
  } from 'react-router-dom';
  import "./App.scss";

import { MainPage } from './components/page/MainPage/MainPage';
import { AboutUs } from './components/page/AboutUs/AboutUs';
import { DeliveryAndPay } from './components/page/DeliveryAndPay/DeliveryAndPay';

export const App = () => {
    return (
      <Routes>
        <Route 
          path="/" 
          element={(
            <MainPage />
          )}
        />

        <Route 
          path="/aboutUs" 
          element={(
            <AboutUs />
          )}
        />

        <Route 
          path="//pay" 
          element={(
            <DeliveryAndPay />
          )}
        />
      </Routes>
    );
}
