const express = require("express")
const {v4:uuidv4} = require("uuid")

const ApiKey = require("./apiKeyModel")

const router = express.Router()

router.post("/generate", async(req,res)=>{

try{

const {userId} = req.body

const key = "rejane_" + uuidv4()

const apiKey = await ApiKey.create({
userId:userId,
apiKey:key
})

res.json({
apiKey:key
})

}catch(err){

res.json({message:"API key error"})

}

})

module.exports = router