import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryButton.css'; // CSS 파일을 임포트합니다.

const CategoryButton = ({ category, setCategory, isActive, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setCategory(category);
    switch (category) {
      case '강수량':
        navigate('/rainfall');
        break;
      case '풍수해':
        navigate('/waterDamage');
        break;
      case '산사태':
        navigate('/landslide');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`category-button ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default CategoryButton;
