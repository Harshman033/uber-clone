import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
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
        },
        status : {
            type : String,
            enum : ["active", "inactive"],
            default : "inactive"
        },
        vehicle : {
            color : {
                type : String,
                required : true,
                minLength : [3, "Color must be atleast of 3 characters"]
            },
            plate : {
                type : String, 
                required : true,
                minLength : [3, "Plate number must be atleast of 3 characters"]
            },
            capacity : {
                type : Number, 
                required : true,
                minLength : [1, "Capacity must be atleast 1"]
            },
            vehicleType : {
                type : String, 
                required : true,
                enum : ["car", "motorcycle", "auto"]
            },
            location : {
                latitude : {
                    type : Number
                },
                longitude : {
                    type : Number
                }
            }
        }
});


captainSchema.pre('save', async function (next){
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

captainSchema.set("toJSON", {
    transform : function (doc, ret){
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    }
})


captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

captainSchema.methods.generateAccessToken =  function(){
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

captainSchema.methods.generateRefreshToken =  function (){
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

export const Captain = mongoose.model("Captain", captainSchema)