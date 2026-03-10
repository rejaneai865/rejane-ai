const express = require("express")

const router = express.Router()

const axios = require("axios")

const askAI = require("../brain/aiRouter")

router.get("/search",async(req,res)=>{

try{

const place = req.query.place

const url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

const response = await axios.get(url,{
params:{
query:place,
key:process.env.GOOGLE_MAPS_API_KEY
}
})

res.json(response.data.results)

}catch(err){

res.status(500).json({
error:"Map search failed"
})

}

})

router.post("/ai-location",async(req,res)=>{

try{

const location = req.body.location

const prompt = "Explain this location and nearby attractions: "+location

const result = await askAI(prompt)

res.json({
analysis:result.text
})

}catch(err){

res.status(500).json({
error:"AI location analysis failed"
})

}

})

module.exports = router