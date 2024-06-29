import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SinAcceso from './Components/SinAcceso/SinAcceso';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SinAcceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;