const mongoose = require("mongoose")

const memorySchema = new mongoose.Schema({

prompt:String,

response:String,

embedding:[Number],

likes:{
type:Number,
default:0
},

created:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Memory",memorySchema)