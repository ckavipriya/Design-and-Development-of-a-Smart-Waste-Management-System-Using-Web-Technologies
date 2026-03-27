// chatbot.js - Professional Waste Management AI Assistant
class WasteChatbot {
  constructor() {
    this.chatContainer = null;
    this.messagesContainer = document.querySelector('.chatbot-messages') || null;
    this.input = null;
    this.toggleBtn = null;
    this.isOpen = false;
    
    this.responses = {
      greetings: [
        "Hello! 👋 I'm WasteBot, your Smart Waste Management assistant.",
        "Hi there! How can I help with your waste management needs?",
        "Hey! Ready to manage waste smarter? 😊"
      ],
      wasteTypes: [
        "We handle: 🟢 Organic, 🔵 Plastic, 🟡 Paper, ⚫ Metal, 🟠 E-waste",
        "Types: Organic (food waste), Recyclables (plastic/paper/metal), Hazardous, E-waste"
      ],
      schedule: [
        "Collections: Mon/Wed/Fri mornings. Submit request via dashboard!",
        "Schedule pickup through 'New Request' in your dashboard 🚚"
      ],
      status: [
        "Check real-time status in your dashboard 📊",
        "Live bin status available in Status page"
      ],
      help: [
        "I can help with: waste types, schedules, status, requests",
        "Need help? Try: 'what waste types', 'pickup schedule', 'check status'"
      ],
      default: [
        "For waste requests, use the dashboard. For status, check Status page 📱",
        "Submit requests via User Dashboard → New Request button",
        "Try asking: 'pickup schedule', 'waste types', or 'how to request'"
      ]
    };
    
    this.init();
  }
  
  init() {
    this.createChatbot();
    this.bindEvents();
  }
  
  createChatbot() {
    // Toggle button
    this.toggleBtn = document.createElement('div');
    this.toggleBtn.className = 'chatbot-toggle';
    this.toggleBtn.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(this.toggleBtn);
    
    // Container
    this.chatContainer = document.createElement('div');
    this.chatContainer.className = 'chatbot-container';
    this.chatContainer.innerHTML = `
      <div class="chatbot-header">
        <div>
          <div class="chatbot-title">WasteBot AI <span style="font-size:0.8rem">🤖</span></div>
        </div>
        <button class="chatbot-close">&times;</button>
      </div>
      <div class="chatbot-messages">
        <div class="message bot">
          <div class="message-bubble">
            Hello! 👋 I'm WasteBot, your AI assistant for Smart Waste Management. 
            <br><br>
            Ask me about: waste types, pickup schedules, status, or how to submit requests! 🚮
          </div>
        </div>
      </div>
      <div class="chatbot-typing">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="chatbot-input">
        <input type="text" placeholder="Ask about waste management..." maxlength="200">
        <button class="chatbot-send">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;
    document.body.appendChild(this.chatContainer);
    
    // Elements
    this.messagesContainer = this.chatContainer.querySelector('.chatbot-messages');
    this.input = this.chatContainer.querySelector('.chatbot-input input');
    this.typingIndicator = this.chatContainer.querySelector('.chatbot-typing');
    this.sendBtn = this.chatContainer.querySelector('.chatbot-send');
    this.closeBtn = this.chatContainer.querySelector('.chatbot-close');
  }
  
  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.closeBtn.addEventListener('click', () => this.close());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    // Auto-close on outside click
    document.addEventListener('click', (e) => {
      if (!this.chatContainer.contains(e.target) && !this.toggleBtn.contains(e.target)) {
        this.close();
      }
    });
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.chatContainer.classList.toggle('open', this.isOpen);
    this.toggleBtn.innerHTML = this.isOpen ? 
      '<i class="fas fa-minus"></i>' : '<i class="fas fa-comments"></i>';
    
    if (this.isOpen) {
      this.input.focus();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }
  
  open() {
    this.isOpen = true;
    this.chatContainer.classList.add('open');
    this.toggleBtn.innerHTML = '<i class="fas fa-minus"></i>';
    this.input.focus();
  }
  
  close() {
    this.isOpen = false;
    this.chatContainer.classList.remove('open');
    this.toggleBtn.innerHTML = '<i class="fas fa-comments"></i>';
  }
  
  sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    this.input.value = '';
    
    // Show typing
    this.showTyping();
    
    // Simulate AI response (with waste-specific intelligence)
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message.toLowerCase());
      this.addMessage(response, 'bot');
    }, 800 + Math.random() * 1200);
  }
  
  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
      <div class="message-bubble">${this.formatMessage(text)}</div>
    `;
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }
  
  generateResponse(message) {
    // Smart waste management responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return this.getRandom(this.responses.greetings);
    }
    if (message.includes('waste type') || message.includes('types')) {
      return this.getRandom(this.responses.wasteTypes);
    }
    if (message.includes('schedule') || message.includes('pickup') || message.includes('collect')) {
      return this.getRandom(this.responses.schedule);
    }
    if (message.includes('status') || message.includes('check')) {
      return this.getRandom(this.responses.status);
    }
    if (message.includes('help') || message.includes('how')) {
      return this.getRandom(this.responses.help);
    }
    return this.getRandom(this.responses.default);
  }
  
  formatMessage(text) {
    // Add emojis and links intelligently
    if (text.includes('request')) return text.replace('request', '<strong>📋 REQUEST</strong>');
    if (text.includes('status')) return text.replace('status', '<strong>📊 STATUS</strong>');
    if (text.includes('schedule')) return text.replace('schedule', '<strong>📅 SCHEDULE</strong>');
    return text;
  }
  
  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  showTyping() {
    this.typingIndicator.style.display = 'block';
    this.scrollToBottom();
  }
  
  hideTyping() {
    this.typingIndicator.style.display = 'none';
  }
  
  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Initialize chatbot when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new WasteChatbot());
} else {
  new WasteChatbot();
}
