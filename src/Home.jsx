import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Asegúrate de importar los estilos

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
        <div className="title-box">
                Aprobar Actividades
        </div>

        <div className="ticket">
          Ticket
        </div>

        <div className="Actividad">
          Actividad
        </div>









        <div className="button-container">
            <button className="btn-Aprobar" onClick={() => navigate('/aprobar')}>
                 Aprobar
            </button>

            <button className="btn-Rechazar" onClick={() => navigate('/rechazar')}>
                 Rechazar
            </button>
        </div>
    </div>
  );
}

export default Home;