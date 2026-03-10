const askOpenAI = require("../ai/openai")
const askGemini = require("../ai/gemini")
const askClaude = require("../ai/claude")

const rankResponses = require("./responseRanker")

async function askMultipleAI(prompt){

const responses = await Promise.all([

askOpenAI(prompt),
askGemini(prompt)

])

const best = rankResponses(responses)

return best

}

async function improveWithClaude(prompt){

const answer = await askClaude(prompt)

return answer

}

module.exports = {
askMultipleAI,
improveWithClaude
}