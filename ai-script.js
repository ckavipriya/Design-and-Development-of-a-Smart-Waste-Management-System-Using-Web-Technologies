function askAI(){

let question=document.getElementById("question").value
let q=question.toLowerCase()

let reply=""

if(q.includes("hello") || q.includes("hi")){
reply="Hello! How can I help you with waste management today?"
}

else if(q.includes("bin")){
reply="Smart bins are equipped with sensors to monitor waste levels."
}

else if(q.includes("collection")){
reply="Waste collection usually happens between 6AM and 10AM in most areas."
}

else if(q.includes("recycle")){
reply="You should separate recyclable waste like plastic, glass and paper."
}

else if(q.includes("wet waste")){
reply="Wet waste includes food scraps and organic materials."
}

else if(q.includes("dry waste")){
reply="Dry waste includes plastic, paper, cardboard and metals."
}

else if(q.includes("report")){
reply="You can report waste problems through the report page in this website."
}

else if(q.includes("smart waste")){
reply="Smart Waste Management uses sensors and web technologies to monitor bins and improve waste collection."
}

else{
reply="Thank you for your question. Our Smart Waste Management system helps track bins, improve recycling and keep the environment clean."
}

let chat=document.getElementById("chatBox")

chat.innerHTML += "<div class='user-msg'>"+question+"</div>"
chat.innerHTML += "<div class='ai-msg'>"+reply+"</div>"

document.getElementById("question").value=""

}
