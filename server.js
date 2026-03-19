import express from "express"
import fetch from "node-fetch"

const app = express()

app.use(express.json())

app.post("/ask", async (req,res)=>{

const question=req.body.question

const response=await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_OPENAI_API_KEY"
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{role:"user",content:question}
]

})

})

const data=await response.json()

res.json({reply:data.choices[0].message.content})

})

app.listen(3000)
