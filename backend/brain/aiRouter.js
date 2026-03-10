const openai = require("../ai/openai")
const grok = require("../ai/grok")
const gemini = require("../ai/gemini")
const perplexity = require("../ai/perplexity")

const Memory = require("../database/memoryModel")

const createEmbedding = require("./embedding")
const searchMemory = require("./vectorSearch")

async function askAI(prompt){

try{

const embedding = await createEmbedding(prompt)

const memory = await searchMemory(embedding)

let context=""

if(memory){

context="Previous knowledge: "+memory.answer

}

const finalPrompt = context+" User question: "+prompt

const responses = await Promise.allSettled([

perplexity(finalPrompt),
openai(finalPrompt),
grok(finalPrompt),
gemini(finalPrompt)

])

let text=""

for(const r of responses){

if(r.status==="fulfilled"){

text=r.value
break

}

}

await Memory.create({

question:prompt,
answer:text,
embedding:embedding

})

return{
text:text,
model:"multi-ai"
}

}catch(err){

return{
text:"AI failed",
model:"error"
}

}

}

module.exports = askAI