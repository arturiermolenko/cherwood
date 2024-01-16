import {
    Routes,
    Route,
  } from 'react-router-dom';
  import "./App.scss";

import { MainPage } from './components/page/MainPage/MainPage';
import { AboutUs } from './components/page/AboutUs/AboutUs';
import { DeliveryAndPay } from './components/page/DeliveryAndPay/DeliveryAndPay';
import { LogIn } from './components/page/LogIn/LogIn'; 
import { SingUp } from './components/page/SingUp/SingUp';
import { Like } from './components/page/Like/Like';

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
          path="/pay" 
          element={(
            <DeliveryAndPay />
          )}
        />

        <Route 
          path="/singUp" 
          element={(
            <SingUp />
          )}
        />

        <Route 
          path="/logIn" 
          element={(
            <LogIn />
          )}
        />

        <Route 
          path="/favorites" 
          element={(
            <Like />
          )}
        />
      </Routes>
    );
}
