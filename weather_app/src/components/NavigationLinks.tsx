import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { NavbarItem } from 'types/Base';

const links: NavbarItem[] = [
      {
        path: "/alerts",
        text: "Alerts"
      },
      {
        path: "/forecast",
        text: "Forecast"
      }
    ]
  
function NavigationLinks(): JSX.Element {
    const vals: ReactNode[] = []
    links.forEach(item => {
        vals.push(
        <li className="nav-item">
            <Link to={item.path} className="nav-link">{item.text}</Link>
        </li>
        )
    });
    return <>
        {vals}
    </>
}  

export default NavigationLinks