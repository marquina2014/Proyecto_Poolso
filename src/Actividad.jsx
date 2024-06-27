import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './index.css';

function Actividad() {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setModalShow(false);
    setModalTitle('');
    setObservaciones('');
    setError('');
  };

  const handleShow = (title) => {
    setModalTitle(title);
    setModalShow(true);
  };

  const handleApprove = () => {
    console.log('Aprobado con observaciones:', observaciones);
    setObservaciones('');
    handleClose();
  };

  const handleReject = () => {
    if (observaciones.trim() === '') {
      setError('Las observaciones son obligatorias para rechazar.');
      return;
    }
    console.log('Rechazado con observaciones:', observaciones);
    setObservaciones('');
    handleClose();
  };

  const ticket = [
    {
      title: 'ID',
      value: '33'
    },
    {
      title: 'Fecha Soporte',
      value: '26/06/2024 10:40'
    },
    {
      title: 'Creado Por',
      value: 'Gabriel Rondón Barrios'
    },
    {
      title: 'Dashboard',
      value: 'Control de Horas'
    },
    {
      title: 'Cliente',
      value: 'BHP'
    },
    {
      title: 'Horas Totales',
      value: '25'
    },
    {
      title: 'Observaciones Generales',
      value: 'asd'
    },
    {
      title: 'Adjuntos',
      value: 'Sin Archivos Cargados'
    }
  ]

  return (
    <div className="approval-container">
      <div className="header">
        <h2 className="Titulo">APROBAR ACTIVIDADES CLIENTE</h2>
      </div>
      <div className="approval-box">
        <div className="section">
          <h3 className="TicAT-Titulo">Información Ticket</h3>
          <div className="section-content">
            <div className="row">
              <div className="column">
                {
                  ticket.map(item=>
                    <div>
                      <div className='inputLabel'>{item.title}</div>
                      <div className='inputValue'>{item.value}</div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h3 className="TicAT-Titulo">Actividad Realizada</h3>
          <div className="section-content">
            <div className="row">
              <div className="column">
                <div>ID: 45</div>
                <div>Horas Reales: 15</div>
                <div>Solicitado Por: Gabriel Rondón Barrios</div>
                <div>Facturable: No</div>
                <div>Detalles: asd</div>
              </div>
              <div className="column">
                <div>Horas Estimadas: 7</div>
                <div>Asignado A: Gabriel Rondón</div>
                <div>Observaciones Consultor: asd</div>
                <div>Adjuntos: Sin Archivos Cargados</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="buttons">
        <button className="btnAproval btn btn-danger btn-lg mr-2" onClick={() => handleShow('Rechazar Actividad')}>
          Rechazar
        </button>
        <button className="btnAproval btn btn-success btn-lg" onClick={() => handleShow('Aprobar Actividad')}>
          Aprobar
        </button>
      </div>

      <Modal show={modalShow} onHide={handleClose} centered>
        <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.5 }}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Observaciones</label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="form-control"
                style={{ resize: 'none' }}
              ></textarea>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {modalTitle === 'Rechazar Actividad' && (
              <button onClick={handleReject} className=" btn btn-danger btn-lg mr-2" >
                Rechazar
              </button>
              
            )}
             {modalTitle === 'Aprobar Actividad' && (
              <button onClick={handleApprove} className=" btn btn-success btn-lg">
                Aprobar
              </button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </motion.div>
      </Modal>
    </div>
  );
}


export default Actividad;