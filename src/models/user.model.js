import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema =  new Schema({
    username:{
        typeof:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        typeof: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        typeof: String,
        required: true,
        trim:true,
        index:true
    },
    avatar:{
        typeof:String, //will use cloudenary to upload imgae 
        required: true,
    },
    coverImage:{
        typeof:String
    },
    watchHistory:[
        {
            typeof:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        typeof:String,
        required:[true,'Password is required'],
    },
    refreshToken:{
        typeof:String
    }

},{
    timestamps:true,
})


//password is begin encrypted to store it on database in hash format
userSchema.pre('save', function(next){

    if(!this.isModifies('password')) return next()
    this.password =  bcrypt.hash(this.password,10)
    next()
})

//the actual password and hash password is compared in bcrypt to check if both of then are equal
userSchema.methods.isPasswordCorrect = async function(password){
    return  await bcrypt.compare('password', this.password)
}


//JWT tokens is being generated using jwt.sign method
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//JWT refresh tokens being generated using jwt sign method
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model.apply('User', userSchema)