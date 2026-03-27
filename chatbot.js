// ✅ NO NETWORK NEEDED - Works everywhere
class WasteBot {
  constructor() {
    this.init();
  }
  
  init() {
    this.toggle = document.getElementById('chatbot-toggle');
    this.chat = document.getElementById('chatbot-container');
    this.messages = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.send = document.getElementById('chatbot-send');
    
    if (this.toggle) this.toggle.onclick = () => this.toggleChat();
    if (this.send) this.send.onclick = () => this.sendMsg();
    if (this.input) this.input.onkeypress = (e) => e.key === 'Enter' && this.sendMsg();
    
    setTimeout(() => this.addMsg('🤖 Hi! Ask: status, schedule, help'), 1000);
  }
  
  toggleChat() {
    this.chat.classList.toggle('open');
  }
  
  addMsg(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    div.textContent = text;
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
  
  sendMsg() {
    const text = this.input.value.trim();
    if (!text) return;
    
    this.send.disabled = true;
    this.addMsg(text, true);
    this.input.value = '';
    
    // Smart replies (no network!)
    const reply = this.getReply(text.toLowerCase());
    setTimeout(() => {
      this.addMsg(reply);
      this.send.disabled = false;
      this.input.focus();
    }, 800);
  }
  
  getReply(text) {
    if (text.includes('status') || text.includes('bin')) return '📊 Bins: Ambattur 85%🔴 | Karur 45%🟡 | Chennai 15%🟢';
    if (text.includes('schedule') || text.includes('pickup')) return '🗓️ Mon/Wed/Fri 7AM. Full bins = 2hr emergency!';
    if (text.includes('type') || text.includes('sort')) return '♻️ Green=Organic | Blue=Plastic | Yellow=Paper | Black=General';
    if (text.includes('help')) return '🤖 Ask: status, schedule, types, report';
    if (text.includes('tcs') || text.includes('placement')) return '🎯 TCS: Java + DSA + SQL. Practice LeetCode medium!';
    return 'Great question! Check dashboard or try "status" 📈';
  }
}

// Start immediately
new WasteBot();
