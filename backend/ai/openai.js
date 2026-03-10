const axios = require("axios")

async function askOpenAI(prompt){

try{

const res = await axios.post(
"https://api.openai.com/v1/chat/completions",
{
model:"gpt-4o-mini",
messages:[
{role:"user",content:prompt}
]
},
{
headers:{
"Authorization":`Bearer ${process.env.OPENAI_KEY}`
}
}
)

return res.data.choices[0].message.content

}catch(err){

return null

}

}

module.exports = askOpenAI