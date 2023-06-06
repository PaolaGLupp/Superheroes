import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Superhero_card from './Sh_card'
import './assets/Home.css'

export default function Home() {

    const [superheroes, setSuperheroes] = useState([]);

    useEffect(()=> {
        const getSuperheroes = async () => {
            const res = await axios.get("http://localhost:3007/superheroes"); 
            setSuperheroes(res.data); 
        }

        getSuperheroes();

    }, [] )

    return (
        <div className="Home">
            
         <div className="cards">
        {superheroes.map((aSuper)=> 
        <Superhero_card key={aSuper.id} id={aSuper.id} name={aSuper.name} image={aSuper.image} /> 
        
        )} 
        </div>
        </div>

    ); 
}