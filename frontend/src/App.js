import {useState} from "react"
import axios from "axios"

function App(){

const [question,setQuestion] = useState("")
const [answer,setAnswer] = useState("")
const [showFeedback,setShowFeedback] = useState(false)

async function askAI(){

const res = await axios.post(
"http://localhost:5000/ask-ai",
{prompt:question}
)

setAnswer(res.data.response)
setShowFeedback(true)

}

async function improveAnswer(){

const res = await axios.post(
"http://localhost:5000/improve",
{prompt:question}
)

setAnswer(res.data.response)

}

return(

<div style={{padding:40}}>

<h1>REJANE AI</h1>

<input
style={{width:"400px"}}
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask anything"
/>

<button onClick={askAI}>
Ask AI
</button>

<h3>{answer}</h3>

{showFeedback && (

<div>

<p>Did you like this answer?</p>

<button onClick={()=>setShowFeedback(false)}>
YES
</button>

<button onClick={improveAnswer}>
NO
</button>

</div>

)}

</div>

)

}

export default App