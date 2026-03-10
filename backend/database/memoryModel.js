const mongoose = require("mongoose")

const memorySchema = new mongoose.Schema({

userId:String,

question:String,

answer:String,

embedding:[Number],

created:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Memory",memorySchema)