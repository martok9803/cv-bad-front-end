// app/static/app.js
// Small enhancements and smooth animations for your CV site

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Martin Kirov CV loaded");

  // Fade in content smoothly
  document.body.classList.add("fade-in");

  // Add hover effect to projects
  document.querySelectorAll(".project").forEach(project => {
    project.addEventListener("mouseover", () => {
      project.style.transform = "translateY(-6px)";
      project.style.boxShadow = "0 12px 30px rgba(88, 166, 255, 0.25)";
    });

    project.addEventListener("mouseleave", () => {
      project.style.transform = "translateY(0)";
      project.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.4)";
    });
  });

  // Animate avatar when hovering (a subtle pulse)
  const avatar = document.querySelector(".avatar");
  if (avatar) {
    avatar.addEventListener("mouseenter", () => {
      avatar.style.transition = "transform 0.4s ease";
      avatar.style.transform = "scale(1.1) rotate(3deg)";
    });
    avatar.addEventListener("mouseleave", () => {
      avatar.style.transform = "scale(1) rotate(0deg)";
    });
  }

  // Scroll reveal for sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll("section").forEach(sec => observer.observe(sec));
});
