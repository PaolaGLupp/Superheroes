import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/App.css'

import Home from './Home' 
import Navbar from './Navbar';
import Create from './Create';
import Superhero from './Superhero';
import Edit from './Edit';

 function App() {

    return (
        <div>

        <div className='main-title'>
            <h1>Superheroes CRUD</h1>
        </div>      
         <Navbar/>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/superhero" element={<Superhero/>}/>
            <Route path="/edit" element={<Edit/>}/>
        </Routes>
         
        </div>

    ); 
}
export default App;