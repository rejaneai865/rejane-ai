import {useState} from "react"
import axios from "axios"

function App(){

const [messages,setMessages] = useState([])
const [input,setInput] = useState("")
const [loading,setLoading] = useState(false)

async function sendMessage(){

if(!input) return

const userMessage = {role:"user",text:input}

setMessages(prev=>[...prev,userMessage])

setLoading(true)

try{

const res = await axios.post(
"http://localhost:5000/ask-ai",
{prompt:input}
)

const aiMessage = {
role:"ai",
text:res.data.response
}

setMessages(prev=>[...prev,aiMessage])

}catch(err){

const aiMessage = {
role:"ai",
text:"Cannot reach backend server"
}

setMessages(prev=>[...prev,aiMessage])

}

setLoading(false)
setInput("")

}

return(

<div style={{maxWidth:"700px",margin:"auto",padding:"20px"}}>

<h1>REJANE AI</h1>

<div style={{
border:"1px solid #ccc",
height:"400px",
overflowY:"auto",
padding:"10px",
marginBottom:"10px"
}}>

{messages.map((msg,index)=>(

<div key={index}
style={{
textAlign:msg.role==="user"?"right":"left",
marginBottom:"10px"
}}>

<span style={{
display:"inline-block",
padding:"10px",
borderRadius:"10px",
background:msg.role==="user"?"#007bff":"#eee",
color:msg.role==="user"?"white":"black"
}}>

{msg.text}

</span>

</div>

))}

{loading && <p>AI thinking...</p>}

</div>

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Ask anything..."
style={{width:"80%",padding:"10px"}}
/>

<button onClick={sendMessage} style={{padding:"10px"}}>

Send

</button>

</div>

)

}

export default App