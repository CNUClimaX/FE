import React from 'react';
import './CategoryButton.css'; // CSS 파일을 임포트합니다.

const CategoryButton = ({ category, setCategory, isActive, children }) => {
  return (
    <div
      className={`category-button ${isActive ? 'active' : ''}`}
      onClick={() => setCategory(category)}
    >
      {children}
    </div>
  );
};

export default CategoryButton;
