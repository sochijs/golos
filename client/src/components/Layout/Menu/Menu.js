import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="Menu">
      <NavLink to="/" exact className="Menu-link" activeClassName="Menu-link_active">Главная</NavLink>
      <NavLink to="/create" className="Menu-link" activeClassName="Menu-link_active">Создать</NavLink>
    </nav>
  );
};

export default Menu;