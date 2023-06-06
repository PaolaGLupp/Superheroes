import {useState} from 'react';
import axios from 'axios';
import PopUp from './PopUp.js';
import './assets/Create.css'

const Create = () => {

  const [shownPopUp, setShownPopUp] = useState(false);

  const url = "http://localhost:3007/superheroes/";

  const [data, setData] = useState({
    name:"", 
    publisher:"", 
    alter_ego:"",
    first_appearance:"",
    image: "",
    characters:""
  })

  function submit(e){
    e.preventDefault();
    if(window.confirm('Are you sure?')){
    axios.post(url, {
      name: data.name,
      publisher:data.publisher, 
      alter_ego:data.alter_ego,
      first_appearance:data.first_appearance,
      image: data.image,
      characters:data.characters,
    })
    .then(res=>{
    })
    setShownPopUp(!shownPopUp ? true : false)
  }
  }

  function handle(e){
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

     
    return (
      <div className='create'> 

      <form className='creation-form' onSubmit={(e)=> submit(e)}> 

      <label for="fname">Name</label>
      <input type="text" name="name" placeholder="Superhero's name" required 
      onChange={(e)=>handle(e)} id="name" value={data.name}/>

      <label for="falter-ego">Alter Ego</label>
      <input type="text" name="alter_ego" placeholder="Your superhero's real identity" required
      onChange={(e)=>handle(e)} id="alter_ego" value={data.alter_ego}/>

      <label for="fcharacters">Other Characters</label>
      <input type="text" name="characters" placeholder="Who else has taken their mantle?" required
      onChange={(e)=>handle(e)} id="characters" value={data.characters}/>

      <label for="ffirstappearance">First Appearance</label>
      <input type="text" name="first_appearance" placeholder="A comic, probably" required
      onChange={(e)=>handle(e)} id="first_appearance" value={data.first_appearance}/>

      <label for="fpublisher">Publisher</label>
      <input type="text" name="publisher" placeholder="Publishing Company" required
      onChange={(e)=>handle(e)} id="publisher" value={data.publisher}/>

      <label for="fimage">Image URL</label>
      <input type="text" name="image" placeholder="Add here your url" required
      onChange={(e)=>handle(e)} id="image" value={data.image}/>
             

      <button type='submit' className="btn" >Create</button>

      </form>

      { shownPopUp? <div>
            
            <PopUp/> 

        </div>
                    : null}


      </div>
    )
  }
  
  export default Create;