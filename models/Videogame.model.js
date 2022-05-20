const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const VideogameSchema = new Schema(
  {
    title: {
      type: String,
      unique: true

    },
    description:{
      type:String,
      unique: true
    },
    image:{
      type: String
    },
    platform:{
      type: String,
      enum: ["Xbox","Playstation", "Steam"]
    },
    postRef:[{
      type:Schema.Types.ObjectId,
      ref:'Post',
    }]
  },
  {
    timestamps: true,
  }
);

const Videogame = model("Videogame", VideogameSchema);

module.exports = Videogame;
