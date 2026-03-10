const mongoose = require("mongoose")

const memorySchema = new mongoose.Schema({

question:String,

answer:String,

embedding:[Number],

liked:{
type:Boolean,
default:null
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Memory",memorySchema)