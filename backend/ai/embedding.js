const OpenAI = require("openai")

const client = new OpenAI({
apiKey:process.env.OPENAI_KEY
})

async function createEmbedding(text){

const res = await client.embeddings.create({
model:"text-embedding-3-small",
input:text
})

return res.data[0].embedding

}

module.exports = createEmbedding