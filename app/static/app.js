// Smooth scroll and fade animation triggers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection fade-up
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

// Typewriter effect
const typeTarget = document.querySelector(".typewriter");
if (typeTarget) {
  const text = typeTarget.textContent;
  typeTarget.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      typeTarget.textContent += text.charAt(i++);
      setTimeout(type, 60);
    }
  }
  type();
}
