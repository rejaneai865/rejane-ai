const express = require("express")

const router = express.Router()

const axios = require("axios")

const askAI = require("../brain/aiRouter")

router.get("/web",async(req,res)=>{

try{

const q = req.query.q

const response = await axios.get(
"https://api.search.brave.com/res/v1/web/search",
{
headers:{
"X-Subscription-Token":process.env.BRAVE_API_KEY
},
params:{
q:q
}
}
)

res.json(response.data.web.results)

}catch(err){

res.status(500).json({
error:"Brave search failed"
})

}

})

router.post("/ai-search",async(req,res)=>{

try{

const query = req.body.query

const response = await axios.get(
"https://api.search.brave.com/res/v1/web/search",
{
headers:{
"X-Subscription-Token":process.env.BRAVE_API_KEY
},
params:{
q:query
}
}
)

const results = response.data.web.results

let combined = ""

results.slice(0,3).forEach(r=>{
combined += r.title+" "+r.description+" "
})

const prompt = "Summarize this information: "+combined

const ai = await askAI(prompt)

res.json({
summary:ai.text,
sources:results.slice(0,3)
})

}catch(err){

res.status(500).json({
error:"AI search failed"
})

}

})

module.exports = router