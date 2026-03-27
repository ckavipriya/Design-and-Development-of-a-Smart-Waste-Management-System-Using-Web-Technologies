const toggle = document.getElementById('chatToggle');
const bot = document.querySelector('.chatbot');
toggle.onclick = () => bot.style.display = bot.style.display === 'block' ? 'none' : 'block';

function sendMsg() {
  const input = document.querySelector('.chat-input textarea');
  const msg = input.value.trim();
  if (!msg) return;
  const chatbox = document.querySelector('.chatbox');
  chatbox.innerHTML += `<li class="chat outgoing"><p>${msg}</p></li>`;
  input.value = '';
  .chatbot { @apply fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200; max-height: 500px; }
  setTimeout(() => {
    const responses = {
      'status': 'Bins: 2 full, 1 medium. Check status.html!',
      'help': 'Login as admin/user or view reports.',
      'hi': 'Hello! How can I help with waste management?'
    };
    const reply = responses[msg.toLowerCase()] || "Thanks! Route optimized.";
    chatbox.innerHTML += `<li class="chat incoming"><p>${reply}</p></li>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 1000);
}
document.querySelector('.chat-input button').onclick = sendMsg;
document.querySelector('.chat-input textarea').onkeypress = e => e.key === 'Enter' && sendMsg();
