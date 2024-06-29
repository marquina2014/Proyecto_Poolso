import image from '../../assets/Nodata.png'
import './SinAcceso.css'

const SinAcceso = props =>{

    return(
        <div className="imageContainer">
            <img className='image' src={image} alt="" />
            <div className='imageTextContainer'>
                <span>El recurso no se encuentra disponible</span>
            </div>
        </div>
    )
}

export default SinAcceso