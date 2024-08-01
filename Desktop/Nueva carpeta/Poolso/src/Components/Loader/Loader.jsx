import loader from '../../assets/loader.gif'
import './Loader.css'

const Loader = props =>{

    return(
        <div className="loaderContainer">
            <img className='loader' src={loader} alt="" />
            <div className='loaderTextContainer'>
                <span>Cargando</span>
            </div>
        </div>
    )
}

export default Loader