import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import './Header.css';

const Header = () => {
  const [category, setCategory] = useState('강수량');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/rainfall':
        setCategory('강수량');
        break;
      case '/waterDamage':
        setCategory('풍수해');
        break;
      case '/landslide':
        setCategory('산사태');
        break;
      default:
        navigate('/rainfall');
        setCategory('강수량');
        break;
    }
  }, [location, navigate]);

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
