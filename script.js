// Typing effect for the subtitle
const typingElement = document.querySelector(".typing");
const phrases = JSON.parse(typingElement.getAttribute("data-text"));
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typingElement.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingElement.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}
if (typingElement && phrases.length) typeLoop();

// IntersectionObserver for reveal animations and skill bars
const reveals = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-fill");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.classList.contains("skills-card")) {
          skillBars.forEach((bar) => {
            const target = bar.getAttribute("data-width");
            bar.style.width = target + "%";
          });
        }
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Active link on scroll
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.getAttribute("id");
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Fake contact form submit (no backend yet)
const fakeSubmit = document.getElementById("fake-submit");
const formNote = document.getElementById("form-note");

const BOT_TOKEN = "8416211853:AAGAyvrYiN_p1O1I_ioBUBcZewTyC1cfN9Q";
const CHAT_ID = "5822439843";

fakeSubmit.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    formNote.textContent = "Please fill all fields.";
    return;
  }

  const text = `
📩 New Portfolio Message

👤 Name: ${name}
📧 Email: ${email}
💬 Message:
${message}
  `;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
    .then(() => {
      formNote.textContent = "Message sent successfully!";
    })
    .catch(() => {
      formNote.textContent = "Failed to send message.";
    });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
