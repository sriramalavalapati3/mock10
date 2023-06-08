
const mongoose=require("mongoose");
const messageSchema=mongoose.Schema({
    "userID": String,
    "created":{ type: Date,
        default: Date.now },
  
    "text":String,
    
})

const Messagemodel=mongoose.model("Messagedetails",messageSchema)

module.exports={Messagemodel}