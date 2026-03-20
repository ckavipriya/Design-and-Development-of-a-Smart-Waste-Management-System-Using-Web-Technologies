function askAI(){

let q = document.getElementById("question").value.toLowerCase()

let reply=""

if(q.includes("bin")){

reply="Please check the bin status page."

}

else if(q.includes("collection")){

reply="Waste collection happens between 6AM and 10AM."

}

else if(q.includes("recycle")){

reply="Separate recyclable waste into recycling bins."

}

else{

reply="Thank you for your question. Our system will assist you."

}

document.getElementById("answer").innerText = reply

}
