const express = require("express")
const router = express.Router()

const crypto = require("crypto")

const ApiKey = require("./apiKeyModel")
const askAI = require("../brain/aiRouter")

function generateKey(){

return crypto.randomBytes(32).toString("hex")

}

router.post("/create-key",async(req,res)=>{

try{

const userId = req.body.userId

const newKey = generateKey()

const api = new ApiKey({

userId:userId,
apiKey:newKey

})

await api.save()

res.json({
apiKey:newKey
})

}catch(err){

res.status(500).json({
error:"API key creation failed"
})

}

})

router.post("/ask",async(req,res)=>{

try{

const apiKey = req.headers["x-api-key"]

const key = await ApiKey.findOne({apiKey})

if(!key){

return res.status(403).json({
error:"Invalid API key"
})

}

const prompt = req.body.prompt

const result = await askAI(prompt)

res.json({
response:result.text,
model:result.model
})

}catch(err){

res.status(500).json({
error:"API request failed"
})

}

})

module.exports = router