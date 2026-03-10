const openai = require("../ai/openai")
const gemini = require("../ai/gemini")
const grok = require("../ai/grok")
const perplexity = require("../ai/perplexity")
const claude = require("../ai/claude")

const rankResponses = require("./responseRanker")
const searchMemory = require("./vectorSearch")

async function askAI(prompt){

const memory = await searchMemory(prompt)

if(memory){

return {
text:memory,
model:"memory"
}

}

let responses = []

try{

const gpt = await openai(prompt)
responses.push({model:"gpt",text:gpt})

}catch{}

try{

const gem = await gemini(prompt)
responses.push({model:"gemini",text:gem})

}catch{}

try{

const gx = await grok(prompt)
responses.push({model:"grok",text:gx})

}catch{}

try{

const px = await perplexity(prompt)
responses.push({model:"perplexity",text:px})

}catch{}

if(responses.length === 0){

const cl = await claude(prompt)

return {
text:cl,
model:"claude"
}

}

const best = rankResponses(responses)

return best

}

module.exports = askAI