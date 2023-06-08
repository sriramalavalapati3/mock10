const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    "username": String,
    "email": String,
    "password": String,
    "verified":Boolean
})

const Usermodel=mongoose.model("userdetails",userSchema)

module.exports={Usermodel}