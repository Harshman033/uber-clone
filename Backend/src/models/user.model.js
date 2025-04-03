import mongoose from  'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    fullName : {
    firstName : {
        type : String,
    required : true,
    minLength : [ 3, "First name should be atleast 3 characters"
    ]
    },
    lastName : {
        type : String,
    minLength : [ 3, "Last name should be atleast 3 characters"]
    }
    },
    email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true
    },
    phoneNumber : {
    type : String,
    required : true,
    unique : true
    },
    password : {
    type : String,
    required : true
    },
    socketId : {
    type : String
    },
    profilePicture : {
        type : String,
    },
    role : {
    type : String,
    enum : ["ride", "driver"],
    required : true,
    default : "rider"
    },
    location : {
        type : String,
    },
    paymentMethod : {

    },
    walletBalance : {
      type : mongoose.Schema.Types.Decimal128,
      default : 0
    },
    rideHistory : [ {
        type : mongoose.Schema.ObjectId,
        ref : "Ride"
        
    }],
    isVerified : {
     type : Boolean,
     default : false
    }
}, {timestamps : true});


userSchema.pre('save', async function(next){
    if(this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
          _id : this._id,
          email : this.email,
          fullName : this.fullName
          
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    
    )
}

userSchema.methods.generateRefreshToken = async function (){
    return jwt.sign(
        {
          _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    
    )
}

export const User = mongoose.model('User', userSchema);