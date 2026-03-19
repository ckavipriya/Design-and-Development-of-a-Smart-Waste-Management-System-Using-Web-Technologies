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
<script>

function sendMessage(){

var input=document.getElementById("userInput").value.toLowerCase()
var response=""

if(input.includes("bin full")){
response="Please report the location of the full bin. The system will schedule collection."
}

else if(input.includes("collection")){
response="Waste collection trucks operate every morning between 6AM and 10AM."
}

else if(input.includes("complaint")){
response="Please use the contact form to register your complaint."
}

else if(input.includes("recycle")){
response="Separate recyclable waste into the blue bin for proper recycling."
}

else{
response="Thank you for contacting Smart Waste AI Assistant. Please provide more details."
}

document.getElementById("aiResponse").innerHTML=response

}

</script>
</script>
