require("dotenv").config()

const express = require("express")
const cors = require("cors")

const askAI = require("./brain/aiRouter")
const usageLimiter = require("./auth/usageLimiter")

const stripeRoutes = require("./payments/stripeRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/payments",stripeRoutes)

app.get("/",(req,res)=>{

res.send("REJANE AI Backend Running")

})

app.post("/ask-ai",usageLimiter,async(req,res)=>{

try{

const prompt = req.body.prompt

const result = await askAI(prompt)

res.json({
response:result.text,
model:result.model
})

}catch(err){

res.status(500).json({
error:"AI failed"
})

}

})

app.post("/improve",async(req,res)=>{

try{

const prompt = req.body.prompt

const claude = require("./ai/claude")

const improved = await claude(prompt)

res.json({
response:improved
})

}catch(err){

res.status(500).json({
error:"Improve failed"
})

}

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})