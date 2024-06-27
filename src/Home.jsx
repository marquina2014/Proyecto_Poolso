import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Asegúrate de importar los estilos
import Actividad from './Actividad';


function Home() {
  const navigate = useNavigate();

  return (
    
    <Actividad/>
  );
}

export default Home;