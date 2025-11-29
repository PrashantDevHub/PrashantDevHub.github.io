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

if (fakeSubmit) {
  fakeSubmit.addEventListener("click", () => {
    formNote.textContent =
      "Thanks for reaching out! This is a demo form — email me directly at devmail.prashant@gmail.com.";
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
