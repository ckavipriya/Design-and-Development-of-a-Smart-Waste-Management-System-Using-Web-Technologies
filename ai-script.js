function openChat(){
document.getElementById("chatWindow").style.display="block"
}

function closeChat(){
document.getElementById("chatWindow").style.display="none"
}

function sendMsg(){

let input=document.getElementById("chatInput").value
let box=document.getElementById("chatMessages")

box.innerHTML += "<p><b>You:</b> "+input+"</p>"

let reply="I can help with waste management information."

if(input.toLowerCase().includes("bin"))
reply="Smart bins use sensors to monitor garbage levels."

else if(input.toLowerCase().includes("report"))
reply="You can report waste issues in the report page."

else if(input.toLowerCase().includes("contact"))
reply="Please check the contact page for support."

box.innerHTML += "<p><b>Bot:</b> "+reply+"</p>"

document.getElementById("chatInput").value=""
}
