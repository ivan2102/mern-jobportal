import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({

   name: {type: String, required: [true, 'Please provide valid name'], minlenght: 3, maxlength: 20, trim: true},
   lastName: {type: String, maxlength: 20, trim: true, default: 'last name' },
   email: {
    type: String,
     required: 
     [true, 'Please provide valid email'], 
     unique: true,
     validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email'
     }
    },
   password: {type: String,
       required: [true, 'Please provide valid password'],
        minlenght: 6,
         select: false},
   location: {type: String, maxlength: 20, trim: true, default: 'my city'},
   
})

//hashing the password
UserSchema.pre('save', async function()  {
    
   if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})

//set up jsonwebtoken
UserSchema.methods.createJWT = function() {

   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {

      expiresIn: process.env.JWT_LIFETIME
   })
}

//compare password
UserSchema.methods.comparePassword = async function (userPassword) {

   const isMatch = await bcrypt.compare(userPassword, this.password)
   return isMatch
}

export default mongoose.model('User', UserSchema)