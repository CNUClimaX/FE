import React from 'react';
import CategoryButton from './CategoryButton';
import './Header.css'; // Header 스타일을 임포트합니다.

const Header = ({ setCategory }) => {
  return (
    <header className="header">
      <div className="button-container">
        <CategoryButton category="강수량" setCategory={setCategory}>강수량</CategoryButton>
        <CategoryButton category="풍수해" setCategory={setCategory}>풍수해</CategoryButton>
        <CategoryButton category="산사태" setCategory={setCategory}>산사태</CategoryButton>
      </div>
    </header>
  );
};

export default Header;
