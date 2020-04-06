import React from 'react';
import {NavLink, Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper blue darken-1">
        <Link to="#" className="brand-logo">Logo</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};