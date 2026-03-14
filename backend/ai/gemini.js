const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function gemini(prompt) {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    })

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    })

    const response = result.response
    const text = response.text()

    return text

  } catch (error) {

    console.error("Gemini error:", error)
    return null

  }

}

module.exports = gemini