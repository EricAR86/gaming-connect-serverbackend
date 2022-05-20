const router = require("express").Router()
const Videogame = require("../models/Videogame.model")


router.get("/videogames", (req, res) => {
    Videogame.find()
    .then(videogames => {
        res.json(videogames)
    })
    .catch((err) => console.log(err))
    })

// Crear videojuego
router.post("/new-videogame", (req, res)=>{
    
    Videogame.create(req.body)
        .then(newVideoG => {
        res.status(201).json({
            msg: "Nuevo juego creado",
            newVideoG})
        })
        .catch((err) => console.log(err))
})

module.exports = router;