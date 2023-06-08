const express=require("express")

const userrouter=express.Router();
const {Usermodel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
     
         const user=await Usermodel.findOne({email})
        
         if(user.verified==true){
         bcrypt.compare(password, user.password, function(err, result) {
         if(result){
         const token = jwt.sign({userID:user._id},process.env.token);
        
        
         res.status(201).send({"msg":"Login Successfull","token":token})
         } else {res.send("Wrong Credntials")}
         });
         } else {
         res.status(202).send("your not verified yet")
         }
         }
     catch (error) {
     res.send(`Something went wrong \n ${error.message}`)
 
 
    }
})

module.exports={userrouter}
