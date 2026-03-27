// 🚀 SMART AI CHATBOT - Answers ANY Question
class SmartWasteAI {
  constructor(apiKey = 'gsk_your_groq_key_here') {  // Replace with YOUR key
    this.apiKey = apiKey;
    this.model = 'llama3-8b-8192'; // Groq free model (or 'gpt-3.5-turbo')
    this.conversation = [{ role: 'system', content: 'You are WasteBot, expert AI assistant for Smart Waste Management System. Answer concisely about bins, waste sorting, schedules, routes, recycling, environmental impact. Be helpful, professional, use emojis. For non-waste topics, redirect politely to waste topics.' }];
    this.init();
  }
  
  init() {
    // ... existing toggle/UI code ...
    this.apiUrl = this.apiKey.startsWith('gsk_') ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
  }// Add conversation reset
addClearButton() {
  // Add X button to clear history
}

// Streaming responses (real-time typing)
stream: true in API call + parse chunks
  
  async sendMessage() {
    const text = this.input.value.trim();
    if (!text || this.sendBtn.disabled) return;
    
    this.sendBtn.disabled = true;
    this.addMessage(text, true);
    this.input.value = '';
    
    // Add to conversation
    this.conversation.push({ role: 'user', content: text });
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.conversation,
          max_tokens: 300,
          temperature: 0.7,
          stream: false  // Set true for streaming later
        })
      });
      
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const data = await response.json();
      const aiReply = data.choices[0].message.content;
      
      // Add to conversation
      this.conversation.push({ role: 'assistant', content: aiReply });
      
      this.addBotMessage(aiReply);
      
    } catch (error) {
      console.error('AI Error:', error);
      this.addBotMessage('❌ AI service temporarily unavailable. Try: "bin status" or "waste types" 😊');
    } finally {
      this.sendBtn.disabled = false;
    }
  }
}

// Initialize (paste YOUR API KEY)
document.addEventListener('DOMContentLoaded', () => {
  window.wasteAI = new SmartWasteAI('gsk_YourGroqKeyHere');  // ← CHANGE THIS
});
