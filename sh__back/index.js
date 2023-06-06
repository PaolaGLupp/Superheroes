const express = require('express');
const app = express();
const port = 3007; 

// AQUÍ NOS TRAEMOS TODOS LOS SUPERHÉROES:
let superheroes = require('./superhero.json'); 

app.use(express.json()); // en vez de body parser

//MIDDLEWARE para CORS
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    

    next();
})

const getSuper = (res, id) => {
    let superhero = superheroes.filter((superh)=> superh.id === id);
    if(superhero.length < 1) {
        res.status(404).json();
    }
    return superhero[0];
};

// LLAMADA A TODOS LOS SUPERHÉROES:
app.get('/superheroes', (req, res) =>{
    res.status(200).json(superheroes);
}); 

// LLAMADA A UN SUPERHÉROE 
app.get('/superheroes/:id', (req, res)=>{
    let id = parseInt(req.params.id);
    let superh = getSuper(res, id);
    res.status(200).json(superh);
});

// POST
app.post('/superheroes', (req,res) => {
    const info = req.body; 

    if (!("name" in info) || !("publisher" in info) || !("alter_ego" in info) || !("first_appearance" in info) || !("image" in info) || !("characters" in info)) {
        res.status(400).json({ message: "Faltan datos"});
        return
    }

    const superhIds = superheroes.map((sh)=> sh.id).sort((a, b)=>a-b); // funcion que ordena de menor a mayor en sort
   
    const identifier = superhIds[superhIds.length - 1] + 1; 

    const superhero = {
         id : identifier,
         name : info["name"], 
         publisher :info["publisher"], 
         alter_ego :info["alter_ego"],
         first_appearance :info["first_appearance"],
         image : info["image"],
         characters : info["characters"]
    }; 

    if (!(typeof superhero.name === "string")|| !(superhero.name.length>1)){ 
        res.status(400).json({ message: "Nombre no válido"});
        return
    }

    if (!(typeof superhero.publisher === "string") || !(superhero.publisher.length>1)){ 
        res.status(400).json({ message: "Editora no válida"});
        return
    }

    if (!(typeof superhero.alter_ego === "string")|| !(superhero.alter_ego.length>1)){ 
        res.status(400).json({ message: "Alter ego no válido"});
        return
    }

    if (!(typeof superhero.first_appearance === "string")|| !(superhero.first_appearance.length>1)){ 
        res.status(400).json({ message: "Primera aparición no válida"});
        return
    }

    if (!(typeof superhero.image === "string")|| !(superhero.image.length>1)){ 
        res.status(400).json({ message: "Imagen no válida"});
        return
    }

    if (!(typeof superhero.characters === "string") || !(superhero.image.length>1)){ 
        res.status(400).json({ message: "Personajes no válidos"});
        return
    }

    superheroes.push(superhero);
    
    res.status(201).json(superhero);

});

//PATCH 
app.patch('/superheroes/:id', (req,res) => {
    let info = req.body;
    const identifier= parseInt(req.params.id);

    let currentSuper =  getSuper(res, identifier);

    if("name" in info){
        currentSuper.name = info["name"];
    }

    if("publisher" in info){
        currentSuper.publisher = info["publisher"];
    }

    if("alter_ego" in info){
        currentSuper.alter_ego = info["alter_ego"];
    }

    if("first_appearance" in info){
        currentSuper.first_appearance = info["first_appearance"];
    }

    if("image" in info){
        currentSuper.image = info["image"];
    }

    if("characters" in info){
        currentSuper.characters = info["characters"];
    }
    
    superheroes = superheroes.filter((sh) => sh.id !== identifier); 
 
    superheroes.push(currentSuper)
    
    superheroes = superheroes.sort((a, b)=> {
        if(a.id < b.id) {
            return -1;
        }
    })
 
    res.status(200).json(currentSuper);

}) 

//DELETE
 app.delete("/superheroes/:id", (req, res)=> {
    const identifier= parseInt(req.params.id);
    let currentSuper =  getSuper(res, identifier);

    if(currentSuper.length < 1){
        res.status(404).json({message: "No existe ese superhéroe"});
        return;
    }

   superheroes = superheroes.filter((sh)=> sh.id !== identifier);

    res.status(204).json({message: `Se eliminó elemento con ID ${identifier}`});
}) 

// INICIALIZAR API
app.listen(port, ()=>{
    console.log(`Ho ho ho en el puerto ${port}`)
})