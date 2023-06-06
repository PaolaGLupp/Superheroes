import './assets/PopUp.css'
import { Link } from 'react-router-dom';


export default function PopUp() {

    return (

        <div className='popup'>
            <h1>Done!</h1>
            <Link className='link' to="/Home">
                <button className="btn">Awesome</button>
            </Link>
        </div>
    )
}