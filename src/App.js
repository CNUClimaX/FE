import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/rainfall" element={<Dashboard key="rainfall" category="강수량" />} />
        <Route path="/waterDamage" element={<Dashboard key="waterDamage" category="풍수해" />} />
        <Route path="/landslide" element={<Dashboard key="landslide" category="산사태" />} />
        <Route path="*" element={<Dashboard key="default" category="강수량" />} />
      </Routes>
    </Router>
  );
};

export default App;
