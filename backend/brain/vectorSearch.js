const cosineSimilarity = require("cosine-similarity")
const Memory = require("../database/memoryModel")
const createEmbedding = require("../ai/embedding")

async function searchSimilarQuestion(question){

const questionVector = await createEmbedding(question)

const memories = await Memory.find({liked:true})

let bestMatch = null
let highestScore = 0

for(const memory of memories){

if(!memory.embedding) continue

const score = cosineSimilarity(
questionVector,
memory.embedding
)

if(score > highestScore){

highestScore = score
bestMatch = memory

}

}

if(highestScore > 0.85){

return bestMatch

}

return null

}

module.exports = searchSimilarQuestion