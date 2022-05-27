
const router = require("express").Router()
const Post = require("../models/Post.model")
const Videogame = require("../models/Videogame.model")
const User = require("../models/User.model")
const mongoose = require("mongoose")

// Listar todos los post
router.get("/posts", (req, res) => {
    const { language, platform } = req.query
    console.log(language)
    //Query filter mongodb
    if (language) {
        Post.find({ language, platform })
            .then(posts => {
                res.json(posts)
            })
            .catch((err) => console.log(err))
    } else {
        Post.find()
            .then(posts => {
                res.json(posts)
            })
            .catch((err) => console.log(err))
    }
})

// Crear post
router.post('/posts/new', (req, res, next) => {
    const { videogameRef, userRef } = req.body;

    console.log(req.body)

    Post.create(req.body)
        .then(newPost => {
            return Videogame.findByIdAndUpdate(videogameRef, { $push: { postRef: newPost._id } });
        })
        .then(newPost => {
            return User.findByIdAndUpdate(userRef, { $push: { postRef: newPost._id } });
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});


// Buscar un Post específico
router.get('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;

    // Valida que el postId exista
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified postId is not valid' });
        return;
    }

    Post.findById(postId)
        .populate("videogameRef", "_id title image")
        .populate("userRef", "_id username")
        .then(post => res.status(200).json(post))
        .catch(error => res.json(error));
});

// Actualizar Post
router.put('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified postId is not valid' });
        return;
    }

    Post.findByIdAndUpdate(postId, req.body, { new: true })
        .then((updatedPost) => res.json(updatedPost))
        .catch(error => res.json(error));
});

// Borrar Post
router.delete('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified postId is not valid' });
        return;
    }

    Post.findByIdAndRemove(postId)
        .then(() => res.json({ message: `Project with ${postId} is removed successfully.` }))
        .catch(error => res.json(error));
});


module.exports = router;