const express = require("express")
const app=express();
require("dotenv").config()
const socketio = require("socket.io");
app.use(express.json());
const {connection}=require("./config/config");
const {mroute}=require("./mail/mail")
const {userrouter}=require("./routes/cred")
const {Messagemodel}=require("./model/message.model")
const cors = require("cors")
app.use(cors({origin:"*"}))
app.use("/api",mroute)
app.use("/api",userrouter)

const expressServer = app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log(`connected to db ${process.env.port}`);
    } catch (error) {
      console.log(error.message);
    }
    
  });

  const io = socketio(expressServer);

  io.on("connection",(socket)=>{
    console.log("connected");

    socket.on("message",async(msg)=>{
        let data= new Messagemodel(msg.message)
        await data.save();
        socket.broadcast.emit('message',msg)
        
    })
})


