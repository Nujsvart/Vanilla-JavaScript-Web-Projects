const toggle = document.querySelector("#toggle");
const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#open");
const modal = document.querySelector("#modal");

// Toggle nav
toggle.addEventListener("click", _ => {
  document.body.classList.toggle("show-nav");
});

// Show modal
openBtn.addEventListener("click", _ => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", _ => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  e.target === modal ? (modal.style.display = "none") : false;
});
