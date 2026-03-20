async function getAIResponse(message) {
  const response = await fetch('YOUR_BACKEND_URL/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: message })
  });
  const data = await response.json();
  console.log(data); // check if AI response comes here
}
