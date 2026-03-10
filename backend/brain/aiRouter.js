const openai = require("../ai/openai")
const gemini = require("../ai/gemini")
const grok = require("../ai/grok")
const perplexity = require("../ai/perplexity")
const claude = require("../ai/claude")

const rankResponses = require("./responseRanker")

async function askAI(prompt){

let responses = []

try{

const gpt = await openai(prompt)
responses.push({model:"gpt",text:gpt})

}catch(err){}

try{

const gem = await gemini(prompt)
responses.push({model:"gemini",text:gem})

}catch(err){}

try{

const gx = await grok(prompt)
responses.push({model:"grok",text:gx})

}catch(err){}

try{

const px = await perplexity(prompt)
responses.push({model:"perplexity",text:px})

}catch(err){}

if(responses.length === 0){

const cl = await claude(prompt)

return {
response:cl,
model:"claude"
}

}

const best = rankResponses(responses)

return best

}

module.exports = askAI