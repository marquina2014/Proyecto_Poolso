import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Aprobar from './Aprobar.jsx';
import Rechazar from './Rechazar.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aprobar" element={<Aprobar />} />
        <Route path="/rechazar" element={<Rechazar />} />
      </Routes>
    </Router>
  );
}

export default App;