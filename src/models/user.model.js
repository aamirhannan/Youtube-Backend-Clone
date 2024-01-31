import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,  // Corrected from typeof to type
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,  // Corrected from typeof to type
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,  // Corrected from typeof to type
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  // Corrected from typeof to type
        required: true,
    },
    coverImage: {
        type: String,  // Corrected from typeof to type
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    password: {
        type: String,  // Corrected from typeof to type
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,  // Corrected from typeof to type
    }

}, {
    timestamps: true,
})


// password is being encrypted to store it on the database in hash format
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hashSync(this.password, 10)  // Corrected from bcrypt.hash to bcrypt.hashSync
    next()
})

// the actual password and hash password are compared in bcrypt to check if both of them are equal
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)  // Corrected from bcrypt.compare('password', this.password)
}

// JWT tokens are being generated using jwt.sign method
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// JWT refresh tokens are being generated using jwt.sign method
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)  // Corrected from apply to just calling the mongoose.model function

