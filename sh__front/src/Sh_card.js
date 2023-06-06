import './assets/Sh_card.css'
import { Link } from 'react-router-dom';
import { BiTrash, BiPencil, BiDetail } from 'react-icons/bi'
import {useState} from 'react';
import axios from 'axios';


export default function Superhero_card(props) {

    const [dialog, setDialog] = useState({
        isLoading:false,
    });
    
     

    const deleteSuperhero = () => {
        if(window.confirm('Are you sure?')){
            const currentShId = props.id;

            axios.delete(`http://localhost:3007/superheroes/${currentShId}`);
            window.location.reload(true);
    }
    } 
    
    return (
         
        <div className="container">
            <div className="border">
                <div className="superhero-card">
                    <div className="text">
                         <h4 className="title">{props.name}</h4>
                            <img className="img" src={props.image}/>
                 
                    </div>
                    <div className="buttons">
                        <Link className='link' to="/Superhero" state={{id: `${props.id}`}}>
                            <button className="btn"><BiDetail/></button>
                        </Link>
                        <Link className='link' to="/Edit" state={{id: `${props.id}`}}>
                            <button className="btn"><BiPencil/></button>
                        </Link>
                        <button className="btn" onClick={(e)=> deleteSuperhero(e.target.value)}><BiTrash/></button>
                     </div>
                </div>
            </div>
        </div>     
    );
}