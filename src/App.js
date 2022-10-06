import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/index" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
