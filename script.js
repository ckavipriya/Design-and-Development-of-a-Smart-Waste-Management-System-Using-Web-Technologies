// script.js
async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const responseDiv = document.getElementById("ai-response");

  try {
    const res = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput })
    });
    const data = await res.json();
    responseDiv.innerText = data.reply;
  } catch (err) {
    responseDiv.innerText = "AI is not responding. Check server!";
    console.error(err);
  }
}
