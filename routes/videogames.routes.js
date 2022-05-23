const router = require("express").Router()
const mongoose = require("mongoose")
const Videogame = require("../models/Videogame.model")

// Listar videojuegos
router.get("/videogames", (req, res) => {
    Videogame.find()
    .then(videogames => {
        res.json(videogames)
    })
    .catch((err) => console.log(err))
    })

// Crear videojuego
router.post("/videogames/new", (req, res)=>{
    
    Videogame.create(req.body)
        .then(newVideoG => {
        res.status(201).json({
            msg: "Nuevo juego creado",
            newVideoG})
        })
        .catch((err) => console.log(err))
})

// Editar videogame
router.put('/videogames/:videogameid', (req, res, next) => {
    const { videogameid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videogameid)) {
        res.status(400).json({ message: 'Specified videogameid is not valid' });
        return;
    }

    Videogame.findByIdAndUpdate(videogameid, req.body, { new: true })
        .then((updatedVideoGame) => res.json(updatedVideoGame))
        .catch(error => res.json(error));
});

// Borrar Videojuego
router.delete('/videogames/:videogameid', (req, res, next) => {
    const { videogameid } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(videogameid)) {
        res.status(400).json({ message: 'Specified videogameid is not valid' });
        return;
    }
  
    Videogame.findByIdAndRemove(videogameid)
        .then(() => res.json({ message: `Project with ${videogameid} is removed successfully.` }))
        .catch(error => res.json(error));
  });

module.exports = router;