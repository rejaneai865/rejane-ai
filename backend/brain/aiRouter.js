const gemini = require("../ai/gemini")

async function askAI(prompt){

console.log("User prompt:",prompt)

const response = await gemini(prompt)

if(response){

return response

}

return "AI system running but Gemini failed."

}

module.exports = { askAI }