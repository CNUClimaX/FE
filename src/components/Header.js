import React from 'react';
import CategoryButton from './CategoryButton';
import './Header.css';

const Header = ({ setCategory }) => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="logo">ClimaX</div>
        <div className="button-container">
          <CategoryButton category="강수량" setCategory={setCategory}>강수량</CategoryButton>
          <CategoryButton category="풍수해" setCategory={setCategory}>풍수해</CategoryButton>
          <CategoryButton category="산사태" setCategory={setCategory}>산사태</CategoryButton>
        </div>
      </header>
    </div>
  );
};

export default Header;
