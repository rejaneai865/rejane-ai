const Memory = require("../database/memoryModel")

function cosineSimilarity(a,b){

let dot=0
let magA=0
let magB=0

for(let i=0;i<a.length;i++){

dot += a[i]*b[i]
magA += a[i]*a[i]
magB += b[i]*b[i]

}

magA = Math.sqrt(magA)
magB = Math.sqrt(magB)

return dot/(magA*magB)

}

async function searchMemory(queryEmbedding){

const memories = await Memory.find()

let best = null
let bestScore = 0

for(const mem of memories){

const score = cosineSimilarity(queryEmbedding,mem.embedding)

if(score>bestScore){

bestScore = score
best = mem

}

}

return best

}

module.exports = searchMemory