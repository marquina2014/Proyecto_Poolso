import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './index.css';

import logo from './assets/Poolsorojo.png';
import Loader from './Components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { urlcon } from './Services';

function Actividad() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalTitle2, setModalTitle2] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [aid, setAid] = useState(null);
  const [dloader, setDloader] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    setModalShow(false);
    setModalShow2(false);
    setModalTitle('');
    setModalTitle2('');
    setObservaciones('');
    setError('');
  };

  const handleShow = (title) => {
    setModalTitle(title);
    setModalShow(true);
  };

  const handleShow2 = (title) => {
    setModalTitle2(title);
    setModalShow2(true);
  };

  const handleApprove = () => {
    console.log('Aprobado con observaciones:', observaciones);
    setObservaciones('');
    handleClose();
    handleShow2('Aprobar esta actividad');
  };
  const handleConfirmApprove = () => {
    console.log('Confirmando Aprobacion con observaciones:', observaciones);
    setObservaciones('');
    handleClose();
    aprobar();
  };

  const handleReject = () => {
    if (observaciones.trim() === '') {
      setError('Las observaciones son obligatorias para rechazar.');
      return;
    }
    console.log('Rechazado con observaciones:', observaciones);
    handleClose();
    handleShow2('Rechazar esta actividad');
  };

  const handleConfirmReject = () => {
    console.log('Confirmando rechazo con observaciones:', observaciones);
    setObservaciones('');
    handleClose();
    rechazar();
  };

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const getAID = params.get('aid');
    setAid(getAID);

    if (!getAID) {
      navigate('SinAcceso');
    }

    fetch(urlcon, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "post",
        controller: "Validate",
        data: `{aid: '${getAID}'}`
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          const valuesTicket = [];
          const valuesActividad = [];
          Object.keys(data.Ticket).forEach(item => {
            valuesTicket.push({
              title: item.split("_").join(" "),
              value: data.Ticket[item]
            });
          });
          Object.keys(data.Actividad).forEach(item => {
            valuesActividad.push({
              title: item.split("_").join(" "),
              value: data.Actividad[item]
            });
          });

          setTicket(valuesTicket);
          setActividad(valuesActividad);
          setDloader(false);
        });
      } else {
        navigate('/SinAcceso');
      }
    });
  }, [navigate]);

  const rechazar = () => {
    setDloader(true);

    fetch(urlcon, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "post",
        controller: "Reject",
        data: `{aid: '${aid}', observaciones: '${observaciones}', cliente: 1}`
      })
    }).then(response => {
      setDloader(false);
      if (response.status === 200) {
        navigate('/Completado');
        alert("Su Rechazo se ha Enviado!");
      } else {
        alert("Error al enviar");
      }
    });
  };

  const aprobar = () => {
    setDloader(true);

    fetch(urlcon, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "post",
        controller: "Approve",
        data: `{aid: '${aid}', observaciones: '${observaciones}', cliente: 1}`
      })
    }).then(response => {
      setDloader(false);
      if (response.status === 200) {
        navigate('/Completado');
        alert("Su Aprobación se ha enviado!");
      } else {
        alert("Error al enviar");
      }
    });
  };

  return (
    <div className="approval-container">
      <div className="header">
        <h2 className="Titulo">Soporte Poolso</h2>
        <img className='logo' src={logo} alt="" />
      </div>
      <div className="approval-box">
        <div className="section">
          <h3 className="TicAT-Titulo">Información Ticket</h3>
          <div className="section-content">
            <div className="row">
              <div className="column">
                {
                  ticket.map(item =>
                    <div key={item.title}>
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
                {
                  actividad.map(item =>
                    <div key={item.title}>
                      <div className='inputLabel'>{item.title}</div>
                      <div className='inputValue'>{item.value}</div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          className="btnAproval btn btn-danger btn-lg mr-2"
          onClick={() => handleShow('Rechazar Actividad')}
        >
          Rechazar
        </button>
        <button
          className="btnAproval btn btn-success btn-lg"
          onClick={() => handleShow('Aprobar Actividad')}
        >
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
              <button className="btn btn-danger btn-lg mr-2" onClick={handleReject}>
                Rechazar
                </button>
            )}
            {modalTitle === 'Aprobar Actividad' && (
              <button className="btn btn-success btn-lg" onClick={handleApprove}>
                Aprobar
              </button>
            )}
            <button onClick={handleClose} className="btn btn-cerrar btn-lg">
              Cerrar
            </button>
          </Modal.Footer>
        </motion.div>
      </Modal>

      <Modal show={modalShow2} onHide={handleClose} centered>
        <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.5 }}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle2}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Está seguro de que desea {modalTitle2}?</p>
          </Modal.Body>
          <Modal.Footer>
            
          {modalTitle2 === 'Rechazar esta actividad' && (
              <button className="btn btn-danger btn-lg mr-2" onClick={handleConfirmReject}>
                Rechazar
                </button>
            )}
            {modalTitle2 === 'Aprobar esta actividad' && (
              <button className="btn btn-success btn-lg" onClick={handleConfirmApprove}>
                Aprobar
              </button>
            )}
            <button className="btn btn-secondary btn-lg mr-2" onClick={handleClose}>
              Cancelar
            </button>
          </Modal.Footer>
        </motion.div>
      </Modal>

      {dloader && <Loader />}
    </div>
  );
}

export default Actividad;
