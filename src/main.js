let step = 0;
let started = false;

const messages = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const hero = document.querySelector(".hero");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function getBotReply(input) {
  const text = input.toLowerCase();

  if (step === 0) {
    if (text.includes("buzz")) {
      step = 1;
      return "Nice choice ✂️ A Buzz Cut is clean and low-maintenance. I recommend adding a take-home shampoo for $5. Want to include it?";
    }

    if (text.includes("regular")) {
      step = 1;
      return "Great pick ✨ A Regular Cut gives you a polished everyday look. I recommend adding styling gel for $7. Want to include it?";
    }

    return "Welcome to Glow Hair Studio 💇‍♀️ Please choose a service: Buzz Cut or Regular Cut.";
  }

  if (step === 1) {
    if (text.includes("yes")) {
      step = 2;
      return "Perfect. I added the extra product to your booking. Your appointment request is ready ✅";
    }

    if (text.includes("no")) {
      step = 2;
      return "No problem. Your haircut booking is ready without extras ✅";
    }

    return "Please reply with Yes or No so I can finish your booking.";
  }

  return "Thanks for visiting Glow Hair Studio. Type Buzz Cut or Regular Cut to start a new booking.";
}

function sendMessage(input) {
  if (!input || input.trim() === "") return;

  if (!started && hero) {
    hero.style.display = "none";
    started = true;
  }

  addMessage(input, "user");

  const reply = getBotReply(input);
  addMessage(reply, "bot");
}

function sendFromInput() {
  const input = userInput.value.trim();
  if (input === "") return;

  sendMessage(input);
  userInput.value = "";
}

window.sendMessage = sendMessage;
window.sendFromInput = sendFromInput;

userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendFromInput();
  }
});

addMessage(
  "Welcome to Glow Hair Studio 💇‍♀️ Please choose a service: Buzz Cut or Regular Cut.",
  "bot"
);