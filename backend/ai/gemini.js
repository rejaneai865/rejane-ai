const axios = require("axios")

async function askGemini(prompt){

try{

const res = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
{
contents:[
{
parts:[{text:prompt}]
}
]
}
)

return res.data.candidates[0].content.parts[0].text

}catch(err){

return null

}

}

module.exports = askGemini