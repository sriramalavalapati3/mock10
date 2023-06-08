const nodemailer = require('nodemailer');
const express=require("express");
const mroute=express.Router();
const bcrypt=require("bcrypt")
require("dotenv").config();
const {Usermodel}=require("../model/user.model")
mroute.post("/register",async(req,res)=>{
    let {email,password,username}=req.body;
    let token;
    bcrypt.hash(password,5, async(err, hash)=>{
                    if(err)
                    {
                        console.log(err +"in hassing")
                    }else{
                        let D={email,password:hash,username,verified:false}
                      let data=new Usermodel(D);
                      await data.save();
                      console.log(data._id.toString());
                      token=data._id.toString();
                
                     res.status(200).send("otp send to mail")
                    }
                })

    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
        var len = 10;
 
// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
// var pattern = 'a1A0@'
 
// var token = randomId(len, pattern)
        const verificationLink = `localhost:4500/api/verify-email?token=${token}`;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'sriramalavalapatiit01@gmail.com',
                pass: process.env.gpassword
            }
        });
       
        // Message object
        let message = {
            from: 'sriramalavalapati01@gmail.com',
            to: `${req.body.email}`,
            subject: 'email otp verification',
            text: 'Hi this for email verification with out email verification u cant login',
            html: `Click the following link to verify your email: ${verificationLink}`
        };
    
        transporter.sendMail(message, async(err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
          
           
    });
})
})


//==================================================>



mroute.get("/verify-email", async (req, res) => {
    const token = req.query.token;
  
    // Perform the verification logic here
    // Find the user document by the verification token
    const user = await Usermodel.findOne({_id: token });
  
    if (user) {
      // Update the verification status to true
      user.verified = true;
      await user.save();
  
      res.status(200).send("Email verification successful. You can now log in.");
    } else {
      res.status(400).send("Invalid verification token.");
    }
  });

  module.exports={mroute}
  