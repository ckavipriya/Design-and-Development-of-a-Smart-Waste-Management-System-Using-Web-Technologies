// script.js or inside <script> in HTML
async function askAI(e) {
  if (e) e.preventDefault(); // prevent form submission if called on submit

  // Get user question
  let question = document.getElementById("question").value;
  let q = question.toLowerCase();

  let reply = "";

  // Simple local AI responses (optional)
  if (q.includes("bin")) {
    reply = "AI: Please check the dashboard to see the current bin status.";
  } else if (q.includes("collection")) {
    reply = "AI: Waste collection happens every morning between 6AM and 10AM.";
  } else if (q.includes("recycle")) {
    reply = "AI: Please separate recyclable waste into recycling bins.";
  } else {
    reply = "AI: Thank you for your question. Our waste management system will assist you.";
  }

  // Display local reply immediately
  document.getElementById("answer").innerText = reply;

  // Send question to backend AI server
  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    // Update answer with backend AI reply (if any)
    if (data.reply) {
      document.getElementById("answer").innerText = data.reply;
    }

    // Show form success message
    document.getElementById("formMessage").innerText = "Your message has been sent successfully!";
  } catch (err) {
    console.error("AI request failed:", err);
    document.getElementById("answer").innerText = "AI is not responding. Please try again later.";
  }
}
