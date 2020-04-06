import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-wrapper blue darken-1">
        <a href="#" className="brand-logo">Logo</a>
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