// 🚀 SMART AI CHATBOT - YOUR WORKING KEY ✅
class SmartWasteAI {
  constructor() {
    this.apiKey = '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'; // ✅ YOUR KEY
    this.model = 'llama3-8b-8192'; // Fastest free model
    this.conversation = [{
      role: 'system', 
      content: `You are WasteBot 🤖, expert AI for Smart Waste Management System by Kavipriya (VSB College). 
      Answer concisely about:
      • 📊 Bin status, fill levels, locations
      • 🗓️ Pickup schedules, routes
      • ♻️ Waste sorting, recycling tips
      • 🌍 Waste stats, environment
      • 🚛 Collection optimization
      
      Use emojis, be professional, short answers. Example: "Ambattur bin 85% full 🚛 dispatched!"
      For coding/placement questions: "Great question! For TCS prep, focus on DSA + Java."
      
      Keep replies under 150 words.`
    }];
    this.init();
  }
  
  init() {
    this.toggleBtn = document.getElementById('chatbot-toggle');
    this.container = document.getElementById('chatbot-container');
    this.messages = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('chatbot-send');
    
    this.toggleBtn?.addEventListener('click', () => this.toggle());
    this.sendBtn?.addEventListener('click', () => this.sendMessage());
    this.input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Welcome
    setTimeout(() => this.addBotMessage('🤖 WasteBot online! Ask about bins, waste tips, or placements!'), 500);
  }
  
  toggle() {
    this.container.classList.toggle('open');
  }
  
  addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
    this.container.scrollTop = this.container.scrollHeight;
  }
  
  async sendMessage() {
    const text = this.input.value.trim();
    if (!text || this.sendBtn.disabled) return;
    
    this.sendBtn.disabled = true;
    this.input.disabled = true;
    this.addMessage(text, true);
    this.input.value = '';
    
    try {
      this.conversation.push({ role: 'user', content: text });
      
      // Show typing indicator
      const typingMsg = this.addTypingIndicator();
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.conversation.slice(-10), // Last 10 messages
          max_tokens: 250,
          temperature: 0.7,
          stream: false
        })
      });
      
      if (!response.ok) {
        throw new Error(`API ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      const aiReply = data.choices[0].message.content.trim();
      
      // Remove typing + add reply
      this.messages.removeChild(typingMsg);
      this.conversation.push({ role: 'assistant', content: aiReply });
      this.addBotMessage(aiReply);
      
    } catch (error) {
      console.error('Chatbot error:', error);
      this.addBotMessage('❌ Network issue. Try again or ask: "bin status" 😊');
    } finally {
      this.sendBtn.disabled = false;
      this.input.disabled = false;
      this.input.focus();
    }
  }
  
  addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
    return div;
  }
}

// 🔥 INITIATE - WORKING WITH YOUR KEY
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.wasteAI = new SmartWasteAI();
  });
} else {
  window.wasteAI = new SmartWasteAI();
}
