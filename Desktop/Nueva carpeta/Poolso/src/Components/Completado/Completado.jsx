import image from '../../assets/Checklist.png'
import './Completado.css'

const Completado = props =>{

    return(
        <div className="imageContainer">
            <img className='image bounce' src={image} alt="" />
            <div className='imageTextContainerCompletado'>
                <span>Su respuesta ha sido enviada, ya puede cerrar esta página</span>
            </div>
        </div>
    )
}

export default Completado