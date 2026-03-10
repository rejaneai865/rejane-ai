const mongoose = require("mongoose")

const apiKeySchema = new mongoose.Schema({

userId:String,

apiKey:String,

plan:{
type:String,
default:"free"
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("ApiKey",apiKeySchema)