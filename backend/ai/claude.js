const axios = require("axios")

async function askClaude(prompt){

try{

const res = await axios.post(
"https://api.anthropic.com/v1/messages",
{
model:"claude-3-haiku-20240307",
max_tokens:500,
messages:[
{role:"user",content:prompt}
]
},
{
headers:{
"x-api-key":process.env.CLAUDE_KEY,
"anthropic-version":"2023-06-01"
}
}
)

return res.data.content[0].text

}catch(err){

return null

}

}

module.exports = askClaude