
const router = require("express").Router()
const Post = require("../models/Post.model")
const Videogame = require("../models/Videogame.model")
const User = require("../models/User.model")


// Crear post
router.post('/new-post', (req, res, next) => {
    const { videogameRef } = req.body;
    
    console.log(req.body)
    
    Post.create(req.body)
        .then(newPost => {
            return Videogame.findByIdAndUpdate(videogameRef, { $push: { postRef: newPost._id } });
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});


module.exports = router;