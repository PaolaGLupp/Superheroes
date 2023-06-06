import './assets/Superhero.css'
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi'

import axios from 'axios';

export default function Superhero() {
        const location = useLocation(); 
        const {id} = location.state;

        const [superhero, setSuperhero] = useState([""]);

        const [superId, setSuperId] = useState(parseInt(id));


        useEffect(()=> {
            
            const getSuperheroData = async () => {
                let resSuper = await axios.get(`http://localhost:3007/superheroes/${superId}`);
                setSuperhero(resSuper.data);
            }
            getSuperheroData();
        }, [superId]);

    return (
         
        <div className="superhero-container">
            <div className='superhero-img-box'>
                <img className='superhero-img' src={superhero.image}/> 
            </div>
            <div className="superhero-text">
                <h1>{superhero.name}</h1>
                <p><strong>Alter ego:</strong> {superhero.alter_ego}</p>
                <p><strong>Publisher:</strong> {superhero.publisher}</p>
                <p><strong>First Appearance:</strong> {superhero.first_appearance}</p>
                <p><strong>Other Characters:</strong> {superhero.characters}</p>
            </div>
            <Link className='link' to="/Edit" state={{id: `${superhero.id}`}}>
                <button className="btn">Edit <BiPencil/></button>
            </Link>

        </div>
        
        
         
    );
}