require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./database/db")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

const PORT = 5000



app.get("/", (req,res)=>{
res.send("REJANE AI backend running")
})



app.post("/ask-ai", async(req,res)=>{

try{

const prompt = req.body.prompt

if(!prompt){
return res.json({
response:"Please enter a question"
})
}

const fakeAnswer = "This is a test AI response for: " + prompt

res.json({
response:fakeAnswer
})

}catch(err){

res.json({
response:"Server error"
})

}

})



app.post("/improve", async(req,res)=>{

try{

const prompt = req.body.prompt

const improvedAnswer = "Improved answer for: " + prompt

res.json({
response:improvedAnswer
})

}catch(err){

res.json({
response:"Claude error"
})

}

})



app.listen(PORT,()=>{

console.log("Server running on port "+PORT)

})