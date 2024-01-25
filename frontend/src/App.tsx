import {
    Routes,
    Route,
    Navigate,
  } from 'react-router-dom';
  import "./App.scss";

import { MainPage } from './components/page/MainPage/MainPage';
import { AboutUs } from './components/page/AboutUs/AboutUs';
import { DeliveryAndPay } from './components/page/DeliveryAndPay/DeliveryAndPay';
import { LogIn } from './components/page/LogIn/LogIn'; 
import { SingUp } from './components/page/SingUp/SingUp';
import { Like } from './components/page/Like/Like';
import { Chart } from './components/page/Chart/Chart';
import { ProfileMain } from './components/page/ProfileMain/Profile'; 
import { SuccessOrder } from './components/pageComponents/SuccessOrder/SuccessOrder';
import { History } from './components/page/History/History';
import { OrderChart } from './components/page/OrderChart/OrderChart';
import { NotFound } from './components/page/NotFound/NotFound';

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

        <Route 
          path="/chart" 
          element={(
            <Chart />
          )}
        />

        <Route 
          path="/order" 
          element={(
            <OrderChart />
          )}
        />  

        <Route 
          path="/profile" 
          element={(
            <ProfileMain />
          )}
        />

        <Route 
          path="/success" 
          element={(
            <SuccessOrder />
          )}
        />

        <Route 
          path="/history" 
          element={(
            <History />
          )}
        />

          <Route path="*" element={<NotFound />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Routes>
    );
}
