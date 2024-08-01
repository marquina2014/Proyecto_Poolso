import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SinAcceso from './Components/SinAcceso/SinAcceso';
import Completado from './Components/Completado/Completado';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SinAcceso" element={<SinAcceso />} />
        <Route path="/Completado" element={<Completado />} />
      </Routes>
    </Router>
  );
}

export default App;