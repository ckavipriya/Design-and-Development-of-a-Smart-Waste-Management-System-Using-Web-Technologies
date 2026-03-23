<!-- Chatbot Button -->
<div id="chatbot-button">💬</div>

<!-- Chatbot Window -->
<div id="chatbot-container">
  <div id="chatbot-header">
    Smart Waste Assistant
    <span id="close-chat">✖</span>
  </div>

  <div id="chatbot-messages">
    <div class="bot-msg">Hello 👋 I am your Waste Assistant. Ask me anything.</div>
  </div>

  <div id="chatbot-input">
    <input type="text" id="user-input" placeholder="Ask about bins, report, contact..." />
    <button onclick="sendMessage()">Send</button>
  </div>
</div>

<style>
#chatbot-button{
position:fixed;
bottom:25px;
right:25px;
background:#16a34a;
color:white;
font-size:24px;
padding:15px;
border-radius:50%;
cursor:pointer;
box-shadow:0 4px 10px rgba(0,0,0,0.3);
z-index:999;
}

#chatbot-container{
position:fixed;
bottom:90px;
right:25px;
width:320px;
background:white;
border-radius:10px;
box-shadow:0 5px 20px rgba(0,0,0,0.3);
display:none;
flex-direction:column;
overflow:hidden;
font-family:Arial;
z-index:999;
}

#chatbot-header{
background:#16a34a;
color:white;
padding:12px;
font-weight:bold;
display:flex;
justify-content:space-between;
}

#chatbot-messages{
height:220px;
overflow-y:auto;
padding:10px;
background:#f3f4f6;
}

.bot-msg{
background:#e5e7eb;
padding:8px;
border-radius:6px;
margin-bottom:6px;
}

.user-msg{
background:#16a34a;
color:white;
padding:8px;
border-radius:6px;
margin-bottom:6px;
text-align:right;
}

#chatbot-input{
display:flex;
border-top:1px solid #ddd;
}

#chatbot-input input{
flex:1;
border:none;
padding:10px;
outline:none;
}

#chatbot-input button{
background:#16a34a;
color:white;
border:none;
padding:10px 15px;
cursor:pointer;
}
</style>

<script>
const button = document.getElementById("chatbot-button");
const container = document.getElementById("chatbot-container");
const closeBtn = document.getElementById("close-chat");

button.onclick = () => container.style.display="flex";
closeBtn.onclick = () => container.style.display="none";

function sendMessage(){

let input = document.getElementById("user-input");
let msg = input.value.trim();
if(msg==="") return;

let chat = document.getElementById("chatbot-messages");

chat.innerHTML += `<div class="user-msg">${msg}</div>`;

let reply="I can help with smart waste management.";

if(msg.toLowerCase().includes("bin"))
reply="Smart bins detect garbage level using sensors.";

else if(msg.toLowerCase().includes("report"))
reply="Go to the Report page and submit the waste issue.";

else if(msg.toLowerCase().includes("contact"))
reply="Visit the Contact page for phone and email details.";

else if(msg.toLowerCase().includes("location"))
reply="Bins are located in public places like parks, bus stands and markets.";

chat.innerHTML += `<div class="bot-msg">${reply}</div>`;

input.value="";
chat.scrollTop = chat.scrollHeight;
}
</script>
