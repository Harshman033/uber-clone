import mongoose from  'mongoose';
import jwt from 'jsonwebtoken'
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
    password : {
    type : String,
    required : true,
    select : false
    },
    socketId : {
    type : String
    },
    refreshToken : {
        type : String,
        select : false
    }
    // phoneNumber : {
    // type : String,
    // unique : true
    // },
    // profilePicture : {
    //     type : String,
    // },
    // role : {
    // type : String,
    // enum : ["ride", "driver"],
    // required : true,
    // default : "rider"
    // },
    // location : {
    //     type : String,
    // },
    // paymentMethod : {

    // },
    // walletBalance : {
    //   type : mongoose.Schema.Types.Decimal128,
    //   default : 0
    // },
    // rideHistory : [ {
    //     type : mongoose.Schema.ObjectId,
    //     ref : "Ride"
        
    // }],
    // isVerified : {
    //  type : Boolean,
    //  default : false
    // }
}, {timestamps : true});


userSchema.pre('save', async function (next){
    console.log("Inside pre-save middleware...");

    if (!this.isModified("password")) return next(); 

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("Password hashed successfully!");
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

userSchema.set("toJSON", {
    transform : function (doc, ret){
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    }
})


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function(){
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

userSchema.methods.generateRefreshToken =  function (){
    const token = jwt.sign(
        {
          _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    
    )
    return token;
}

export const User = mongoose.model('User', userSchema);