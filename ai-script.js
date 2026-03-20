async function askAI(e){
  e.preventDefault();
  const question = document.getElementById("question").value.trim();
  if(!question) return;
  const answerDiv = document.getElementById("answer");

  let reply = "";
  const q = question.toLowerCase();

  if(q.includes("bin")) reply = "AI: Please check the dashboard to see the current bin status.";
  else if(q.includes("collection")) reply = "AI: Waste collection happens every morning between 6AM and 10AM.";
  else if(q.includes("recycle")) reply = "AI: Please separate recyclable waste into recycling bins.";
  else reply = "AI: Thank you for your question. Our waste management system will assist you.";

  answerDiv.innerText = reply;
}
