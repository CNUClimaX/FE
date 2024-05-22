import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [category, setCategory] = useState('강수량');

  return (
    <div className="App">
      <Header setCategory={setCategory} />
      <Dashboard category={category} />
    </div>
  );
}

export default App;
