// Prevent form from submitting to server (demo only)
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  if (role === "admin") {
    window.location.href = "dashboard.html";
  } else if (role === "collector" || role === "citizen") {
    alert(`Logged in as ${role}`);
    // In real project, redirect to collector / citizen page
  } else {
    alert("Please select a valid role.");
  }
});
