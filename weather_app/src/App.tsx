import React, { ReactNode } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Routes } from 'react-router-dom';
import { NavbarItem } from './types/Base';
import AlertList from './components/AlertList';
import ForecastList from './components/ForecastList';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          krwx
        </a>
        <div className="navbar-nav mr-auto">
          {navLinks()}
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

function links(): NavbarItem[] {
  return [
    {
      path: "/alerts",
      text: "Alerts"
    },
    {
      path: "/forecast",
      text: "Forecast"
    }
  ]
}

function navLinks(): ReactNode {
  const vals: ReactNode[] = []
  links().forEach(element => {
    vals.push(
      <li className="nav-item">
        <Link to={element.path} className="nav-link">{element.text}</Link>
      </li>
    )
  });
  return vals
}

export default App;
