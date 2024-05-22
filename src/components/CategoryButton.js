import React from 'react';
import './CategoryButton.css'; // CSS 파일을 임포트합니다.

const CategoryButton = ({ category, setCategory, children }) => {
  return (
    <div className="category-button" onClick={() => setCategory(category)}>
      {children}
    </div>
  );
};

export default CategoryButton;
