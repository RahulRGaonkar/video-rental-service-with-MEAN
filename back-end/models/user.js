const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200
  },
  email: {
    type: String,
    unqiue: true,
    required: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isAdmin :{
    type:Boolean,
    default:false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = function (){
  const token =jwt.sign({_id: this._id ,isAdmin:this.isAdmin}, process.env.JWT_KEY);
  return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;

