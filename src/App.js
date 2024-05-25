import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css'; // 필요한 경우 CSS 파일을 임포트합니다.

function App() {
  const [category, setCategory] = useState('강수량');

  return (
    <div className="App">
      <Header category={category} setCategory={setCategory} />
      <Dashboard category={category} />
    </div>
  );
}

export default App;
