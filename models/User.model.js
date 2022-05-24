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
      default:"https://www.google.com.mx/search?q=default+user&sxsrf=ALiCzsaFi_n40h6nYXkn8qwwAxDRv_lxxA:1653414343996&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi7sY-12Pj3AhV7DEQIHe_8AHQQ_AUoAXoECAEQAw&biw=1366&bih=657&dpr=1#imgrc=UXM1nMyEO_eSnM"
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
