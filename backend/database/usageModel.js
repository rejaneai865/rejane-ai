const mongoose = require("mongoose")

const usageSchema = new mongoose.Schema({

userId:String,

queriesToday:{
type:Number,
default:0
},

lastReset:{
type:Date,
default:Date.now
},

plan:{
type:String,
default:"free"
}

})

module.exports = mongoose.model("Usage",usageSchema)