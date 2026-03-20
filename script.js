async function askAI(e) {
  e.preventDefault();

  const question = document.getElementById("question").value.trim();
  if (!question) return;

  const answerDiv = document.getElementById("answer");
  const formMessage = document.getElementById("formMessage");

  // Local AI fallback
  let reply = "";
  const q = question.toLowerCase();
  if (q.includes("bin")) {
    reply = "AI: Please check the dashboard to see the current bin status.";
  } else if (q.includes("collection")) {
    reply = "AI: Waste collection happens every morning between 6AM and 10AM.";
  } else if (q.includes("recycle")) {
    reply = "AI: Please separate recyclable waste into recycling bins.";
  } else {
    reply = "AI: Thank you for your question. Our waste management system will assist you.";
  }

  answerDiv.innerText = reply;
  formMessage.innerText = "";

  // Optional: send to backend AI
  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    if (data.reply) {
      answerDiv.innerText = data.reply;
    }

    formMessage.innerText = "Your message has been sent successfully!";
  } catch (err) {
    console.error("AI request failed:", err);
    answerDiv.innerText = reply + " (Backend AI not responding)";
  }
}
