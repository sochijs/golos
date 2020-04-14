import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-wrapper">
        <Logo/>
        <Menu/>
      </div>
    </div>
  );
};

export default Header;