const mongoose = require("mongoose")

const apiKeySchema = new mongoose.Schema({

userId:String,

apiKey:String,

created:{
type:Date,
default:Date.now
},

plan:{
type:String,
default:"free"
}

})

module.exports = mongoose.model("ApiKey",apiKeySchema)