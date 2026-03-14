require("dotenv").config()

console.log("Gemini key:", process.env.GEMINI_API_KEY)

const express = require("express")
const cors = require("cors")

const { askAI } = require("./brain/aiRouter")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/ask-ai", async (req,res)=>{

try{

const prompt = req.body.prompt

const response = await askAI(prompt)

res.json({response})

}catch(err){

console.log(err)

res.json({
response:"Backend AI error"
})

}

})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{

console.log("Server running on port " + PORT)

})