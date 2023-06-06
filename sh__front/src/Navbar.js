import { Link } from 'react-router-dom';
import React from 'react';
import './assets/Navbar.css';


export default function Navbar() {
     
    return (
        <div className="Navbar">
        <Link className='link' to="/Home">
            <button className="btn">Home</button>
        </Link>
        <Link className='link' to="/Create">
            <button className="btn">Create New Superhero</button>
        </Link>
         
        </div>
 
    ); 
}