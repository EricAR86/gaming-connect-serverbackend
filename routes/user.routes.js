const router = require("express").Router()
const mongoose = require("mongoose")
const User = require("../models/User.model")

// Listar todos los usuarios
router.get("/users", (req, res) => {
  User.find()
  .populate("postRef", "title")
  .then(users => {
    res.json(users)
  })
  .catch((err) => console.log(err))
})


// Buscar un User específico
router.get('/users/:userId', (req, res, next) => {
  const { userId } = req.params;

  // Valida que el userId exista
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Specified userId is not valid' });
      return;
  }

  User.findById(userId)
  .populate("postRef", "_id title description date")
      .then(user => res.status(200).json(user))
      .catch(error => res.json(error));
});

// Editar usuario
router.put('/users/:userId', (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Specified userId is not valid' });
      return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
});

// Borrar usuario
router.delete('/users/:userId', (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Specified userID is not valid' });
      return;
  }

  User.findByIdAndRemove(userId)
      .then(() => res.json({ message: `Project with ${userId} is removed successfully.` }))
      .catch(error => res.json(error));
});



module.exports = router;