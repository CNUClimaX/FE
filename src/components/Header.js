import React from 'react';
import CategoryButton from './CategoryButton';
import './Header.css';

const Header = ({ category, setCategory }) => {
  return (
    <div className="header-container">
      <header className="header">
        <div className="logo">ClimaX</div>
        <div className="button-container">
          <CategoryButton category="강수량" setCategory={setCategory} isActive={category === '강수량'}>강수량</CategoryButton>
          <CategoryButton category="풍수해" setCategory={setCategory} isActive={category === '풍수해'}>풍수해</CategoryButton>
          <CategoryButton category="산사태" setCategory={setCategory} isActive={category === '산사태'}>산사태</CategoryButton>
        </div>
      </header>
    </div>
  );
};

export default Header;
