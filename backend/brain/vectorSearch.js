const Memory = require("../database/memoryModel")
const createEmbedding = require("../ai/embedding")

function cosineSimilarity(a,b){

let dot = 0
let normA = 0
let normB = 0

for(let i=0;i<a.length;i++){

dot += a[i]*b[i]
normA += a[i]*a[i]
normB += b[i]*b[i]

}

normA = Math.sqrt(normA)
normB = Math.sqrt(normB)

return dot/(normA*normB)

}

async function searchMemory(prompt){

const embedding = await createEmbedding(prompt)

const memories = await Memory.find()

let best = null
let bestScore = 0

for(const m of memories){

const score = cosineSimilarity(embedding,m.embedding)

if(score > bestScore){

bestScore = score
best = m

}

}

if(bestScore > 0.90){

return best.response

}

return null

}

module.exports = searchMemory