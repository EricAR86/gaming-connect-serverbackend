const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'This user is already used'],
      required:[true,'An username is needed']
    },
    email:{
      type:String,
      unique: [true, 'This email is already used'],
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type:String,
      required:[true,'A password is required']
    },
    country: {
      type:String
    },
    platform:{
      type: String,
      enum: ["Xbox","Playstation", "Steam"]
    },
    avatar:{
      type:String,
      default:"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
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

const User = model("User", UserSchema);

module.exports = User;
