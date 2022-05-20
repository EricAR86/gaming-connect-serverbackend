const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required:[true, 'A title is required']
    },
    description:{
      type:String,
      unique: [true, 'Please enter a description of your session'],
    },
    date: {
      type: Date,
      required: true
    },
    language:{
      type: String,
      enum: ["English", "Español", "Francais", "Portugues", "Italiano"],
      required: [true, 'Select a language'],
    },
    players: {
        type: Number,
        default: 1
    },
    comunication: {
      type: Boolean,
      default: false
    },
    category:{
      type: String,
      enum: ["Casual", "Competitive", "No Experience", "With Experience"],
      required: [true, 'Select a category'],
    },
    videogameRef:{
      type:Schema.Types.ObjectId,
      ref:'Videogame'
    },
    userRef:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", PostSchema);

module.exports = Post;
