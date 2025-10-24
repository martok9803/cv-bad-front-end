// app/static/app.js
// Premium interactions: scroll-reveal, 3D tilt on projects, subtle hovers

document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Subtle 3D tilt on .tilt cards (projects)
  const tiltCards = document.querySelectorAll(".tilt");
  tiltCards.forEach(card => {
    let rect;
    const maxTilt = 10; // deg

    const onMove = (e) => {
      rect = rect || card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * (maxTilt * 2);
      const rx = (0.5 - py) * (maxTilt * 2);
      card.style.setProperty("--rx", rx.toFixed(2) + "deg");
      card.style.setProperty("--ry", ry.toFixed(2) + "deg");
      card.classList.add("tilt-active");
    };

    const onLeave = () => {
      card.classList.remove("tilt-active");
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
      rect = undefined;
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("touchmove", (e) => {
      if (!e.touches[0]) return;
      const t = e.touches[0];
      onMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });
    card.addEventListener("touchend", onLeave);
  });

  // Micro-interaction: ripple on chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      const r = document.createElement("span");
      r.style.position = "absolute";
      r.style.inset = "0";
      r.style.borderRadius = "999px";
      r.style.pointerEvents = "none";
      r.style.boxShadow = "0 0 0 0 rgba(110,231,255,.25)";
      r.style.transition = "box-shadow .45s ease";
      chip.style.position = "relative";
      chip.appendChild(r);
      requestAnimationFrame(() => r.style.boxShadow = "0 0 0 18px rgba(110,231,255,0)");
      setTimeout(() => r.remove(), 500);
    });
  });
});
