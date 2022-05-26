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
      type: String
    },
    avatar:{
      type:String,
      default:"http://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg"
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
