// Professional AI Assistant for Smart Waste Management
class WasteAI {
  constructor() {
    this.responses = {
      greetings: ['Hello! 👋 I\'m WasteBot, your smart assistant. How can I help with waste management?', 
                'Hi there! Need bin status, pickup schedule, or waste tips? 😊'],
      
      status: ['Check the <strong>Dashboard</strong> for live bin levels! 📊 Full bins get priority pickup.',
               'Bins: Ambattur 85%🟥, Karur 45%🟠, Chennai 15%🟢. Need specific location?'],
      
      schedule: ['Collections: Mon/Wed/Fri at 7AM. <strong>Full bins</strong> get emergency pickup within 2hrs 🚛.',
                 'Route optimized! Trucks dispatched to full bins first.'],
      
      types: ['✅ <strong>Organic:</strong> Food waste, garden clippings<br>🟡 <strong>Recyclable:</strong> Plastic, paper, metal<br>🔴 <strong>Hazardous:</strong> Batteries, chemicals<br>⚫ <strong>General:</strong> Everything else'],
      
      help: ['I can help with:<br>• 📊 Bin status & alerts<br>• 🗓️ Pickup schedules<br>• ♻️ Waste sorting guide<br>• 🚨 Report issues<br><strong>Ask me anything!</strong> 🤖'],
      
      report: ['Use the <strong>Report Issue</strong> button in dashboard or call emergency line 📞.',
               'Issues reported: Overflow (24h), Missed pickup (12h), Contamination (48h).'],
      
      default: ['Interesting! Tell me more about your waste concern. 🧐',
                'Got it. For detailed status, check the live dashboard 📈.',
                'Smart question! Admin dashboard has all analytics.']
    };
    
    this.init();
  }
  
  init() {
    this.toggleBtn = document.getElementById('chatbot-toggle');
    this.container = document.getElementById('chatbot-container');
    this.messages = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('chatbot-send');
    
    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Welcome message
    setTimeout(() => this.addBotMessage('Hi! 👋 I\'m WasteBot. Ask about bin status, schedules, or waste tips!'), 1000);
  }
  
  toggle() {
    this.container.classList.toggle('open');
  }
  
  addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user' : 'bot'}`;
    div.innerHTML = text;
    this.messages.appendChild(div);
    this.messages.scrollTop = this.messages.scrollHeight;
  }
  
  async sendMessage() {
    const text = this.input.value.trim();
    if (!text || this.sendBtn.disabled) return;
    
    this.sendBtn.disabled = true;
    this.addMessage(text, true);
    this.input.value = '';
    
    // Simulate typing
    setTimeout(() => {
      const response = this.getResponse(text.toLowerCase());
      this.addBotMessage(response);
      this.sendBtn.disabled = false;
    }, 800 + Math.random() * 1200);
  }
  
  getResponse(input) {
    const keywords = {
      'status': 'status', 'level': 'status', 'full': 'status', 'bin': 'status',
      'schedule': 'schedule', 'pickup': 'schedule', 'collect': 'schedule',
      'type': 'types', 'sort': 'types', 'recycle': 'types',
      'help': 'help', 'what': 'help',
      'report': 'report', 'issue': 'report', 'problem': 'report',
      'hi': 'greetings', 'hello': 'greetings', 'hey': 'greetings'
    };
    
    for (const [key, type] of Object.entries(keywords)) {
      if (input.includes(key)) {
        const responses = this.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    return this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
  }
  
  addBotMessage(text) {
    this.addMessage(text, false);
  }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  window.wasteAI = new WasteAI();
});
