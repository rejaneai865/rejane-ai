const axios = require("axios")

async function createEmbedding(text){

const res = await axios.post(
"https://api.openai.com/v1/embeddings",
{
input:text,
model:"text-embedding-3-small"
},
{
headers:{
Authorization:`Bearer ${process.env.OPENAI_API_KEY}`
}
}
)

return res.data.data[0].embedding

}

module.exports = createEmbedding