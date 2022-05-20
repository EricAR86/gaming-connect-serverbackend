const router = require("express").Router()
const mongoose = require("mongoose")
const User = require("../models/User.model")

router.get("/signup", (req, res) => {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch((err) => console.log(err))
})


router.post("/signup", (req, res)=>{
  const {username, email, password, country, platform, avatar} = req.body
  console.log(req.body)
  User.create({username, email, password, country, platform, avatar})
    .then(newUser => {
      res.json({
          msg: "Nuevo usuario creado",
          newUser})
    })
    .catch((err) => console.log(err))
})

module.exports = router;