import {
    Routes,
    Route,
    Outlet,
  } from 'react-router-dom';
  import "./App.scss";
import { Header } from './components/pageComponents/Header/Header';
import { Footer } from './components/pageComponents/Footer/Footer';
import { MainPage } from './components/page/MainPage/MainPage';

  const OutletPage = () => {
    return (
      <div className="page">
        <Header />
  
        <Outlet />

        <Footer />
      </div>
    );
  };

export const App = () => {
    return (
        <Routes>
            <Route 
              path="/" 
              element={(
                <OutletPage />
              )}
            >

            <Route 
              index
              element={(
                <MainPage />
              )}
            />
            </Route>

        </Routes>
    );
}
