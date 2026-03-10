const express = require("express")
const router = express.Router()

const { google } = require("googleapis")

const askAI = require("../brain/aiRouter")

const youtube = google.youtube({
version:"v3",
auth:process.env.YOUTUBE_API_KEY
})

router.post("/generate-title",async(req,res)=>{

try{

const topic = req.body.topic

const prompt = "Generate a catchy YouTube video title about: "+topic

const result = await askAI(prompt)

res.json({
title:result.text
})

}catch(err){

res.status(500).json({
error:"Title generation failed"
})

}

})

router.post("/generate-description",async(req,res)=>{

try{

const topic = req.body.topic

const prompt = "Generate a YouTube video description about: "+topic

const result = await askAI(prompt)

res.json({
description:result.text
})

}catch(err){

res.status(500).json({
error:"Description generation failed"
})

}

})

router.get("/search",async(req,res)=>{

try{

const q = req.query.q

const response = await youtube.search.list({

part:"snippet",
q:q,
maxResults:5

})

res.json(response.data.items)

}catch(err){

res.status(500).json({
error:"YouTube search failed"
})

}

})

module.exports = router