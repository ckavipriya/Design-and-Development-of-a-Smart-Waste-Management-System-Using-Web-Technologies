function openChat(){
document.getElementById("chatbox").style.display="block";
}

function closeChat(){
document.getElementById("chatbox").style.display="none";
}

function sendMessage(){

let input=document.getElementById("userInput").value.toLowerCase();

let chat=document.getElementById("chat-body");

let response="";

if(input.includes("bin")){
response="Smart bins monitor waste levels using sensors.";
}

else if(input.includes("status")){
response="You can check the waste level in the Status page dashboard.";
}

else if(input.includes("project")){
response="This is a Smart Waste Management System that helps cities manage garbage efficiently.";
}

else if(input.includes("report")){
response="Waste collection reports are available in the Report section.";
}

else{
response="Sorry, I can answer questions about the waste system.";
}

chat.innerHTML += "<p><b>You:</b> "+input+"</p>";
chat.innerHTML += "<p><b>AI:</b> "+response+"</p>";

document.getElementById("userInput").value="";
}
  function sendMessage(event){

event.preventDefault();

let name=document.getElementById("name").value;

document.getElementById("response").innerHTML=
"Thank you "+name+"! Your message has been received.";



}
