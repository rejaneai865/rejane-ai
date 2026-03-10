const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

email:{
type:String,
unique:true
},

password:String,

plan:{
type:String,
default:"free"
},

queriesToday:{
type:Number,
default:0
},

lastQueryDate:{
type:String,
default:""
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("User",userSchema)