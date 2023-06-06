import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PopUp from './PopUp.js';

import axios from 'axios';
import './assets/Create.css'

const Edit = () => {
    
    // CALL TO THE INFO OF THE SUPERHERO
    const location = useLocation();
    const { id } = location.state;
    
    const [superhero, setSuperhero] = useState([""]);
    
    const [superId, setSuperId] = useState(parseInt(id));

    const [shownPopUp, setShownPopUp] = useState(false);
    
    
    useEffect(() => {
        const getSuperheroData = async () => {
            let resSuper = await axios.get(`http://localhost:3007/superheroes/${superId}`);
            setSuperhero(resSuper.data);
            setData(resSuper.data);
        }
        getSuperheroData();
    }, []);
    
    const url = `http://localhost:3007/superheroes/${superId}`;
    
    const [data, setData] = useState({
        name: superhero.name,
        publisher: superhero.publisher,
        alter_ego: superhero.alter_ego,
        first_appearance: superhero.first_appearance,
        image: superhero.image,
        characters: superhero.characters
    })
    
    function handle(e) {
        let newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData); //data obtiene los cambios introducidos en el formulario
    }
    
    const submit = async (e) => {
        e.preventDefault();
        
        if(window.confirm('Are you sure?')) {
            
            let obj = data;
            let jsonObj = JSON.stringify(obj);
            
            let response = await fetch(url, {
                method: 'PATCH',
                body: jsonObj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            setShownPopUp(!shownPopUp ? true : false);
            
        }
        
        /*let info = await axios.patch(url, jsonObj);
        console.log(info); */
    }
    
    return (
        <div className='create'>
        
        <form className='creation-form' onSubmit={(e) => submit(e)}>
        
        <h1>Now editing: {superhero.name}</h1>
        
        <label for="fname">Name</label>
        <input type="text" name="name" placeholder={superhero.name}
        onChange={(e) => handle(e)} id="name" value={data.name} />
        
        <label for="falter-ego">Alter Ego</label>
        <input type="text" name="alter_ego" placeholder={superhero.alter_ego}
        onChange={(e) => handle(e)} id="alter_ego" value={data.alter_ego} />
        
        <label for="fcharacters">Other Characters</label>
        <input type="text" name="characters" placeholder={superhero.characters}
        onChange={(e) => handle(e)} id="characters" value={data.characters} />
        
        <label for="ffirstappearance">First Appearance</label>
        <input type="text" name="first_appearance" placeholder={superhero.first_appearance}
        onChange={(e) => handle(e)} id="first_appearance" value={data.first_appearance} />
        
        <label for="fpublisher">Publisher</label>
        <input type="text" name="publisher" placeholder={superhero.publisher}
        onChange={(e) => handle(e)} id="publisher" value={data.publisher} />
        
        <label for="fimage">Image URL</label>
        <input type="text" name="image" placeholder={superhero.image}
        onChange={(e) => handle(e)} id="image" value={data.image} />
        
        
        <button type='submit' className="btn" >Send</button>
        
        </form>
        { shownPopUp? <div>
            
            <PopUp/> 

        </div>
                    : null}

        </div>
        )
        
    }
    
    export default Edit;