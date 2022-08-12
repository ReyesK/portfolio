import React, { ReactNode } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { NavbarItem } from './types/Base';
import AlertList from './components/AlertList';
import ForecastList from './components/ForecastList';
import NavigationLinks from './components/NavigationLinks';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          krwx
        </a>
        <div className="navbar-nav mr-auto">
          <NavigationLinks />
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AlertList />} />
          <Route path="/alerts" element={<AlertList />} />
          <Route path="/forecast" element={<ForecastList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
