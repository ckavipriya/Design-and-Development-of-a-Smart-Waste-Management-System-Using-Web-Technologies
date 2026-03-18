<script>
const form = document.getElementById('contactForm');
const aiReply = document.getElementById('aiReply');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  const name = document.getElementById('name').value;
  const problem = document.getElementById('problem').value;

  // Hide the form
  form.style.display = 'none';

  // Show AI reply box
  aiReply.style.display = 'block';
  aiReply.innerHTML = `
    <h3>Thank You, ${name}!</h3>
    <p>Your message has been received:</p>
    <blockquote>"${problem}"</blockquote>
    <p>Our AI assistant will get back to you shortly.</p>
  `;

  // Scroll smoothly to reply
  aiReply.scrollIntoView({ behavior: "smooth", block: "start" });
});
</script>
