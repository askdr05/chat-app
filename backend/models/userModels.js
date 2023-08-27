
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"please enter your name"],
        maxLength: [30,,"name cannot exceed 30 character"],
        minLength : [4 , "name should have more than 4 character"]
    },
    email:{
       type: String,
       required: [true, "please enter your email"],
       unique: true,
       validate:[validator.isEmail,'please enter valid Email']
    },
    password:{
        type:String,
        required:[true,"enter your password"],
        minLength:[8,"password should be more than 8 charactor"],
        select : false
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

   
     createdAt:{
      type:Date,
      default:Date.now,
     },

     resetPasswordToken:String,

     resetPasswordExpaire: Date


})


userSchema.pre('save',async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password,10) 
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare Password
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  userSchema.methods.getRessetPasswordToken = function(){
     
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //Hasging and adding to userSchema
    this.resetPasswordToken=crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.resetPasswordExpaire = Date.now() + 15 * 60 * 1000;

    return resetToken

  }
  
module.exports = mongoose.model('User',userSchema)