import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true,
        lowercase : true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        const salt= await bcrypt.genSalt(process.env.BCRYPTSALT)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

userSchema.methods.comparedPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

export  const userModel = mongoose.model('userModel', userSchema )