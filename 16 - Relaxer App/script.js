const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.textContent = "Nefes Al!";
  container.className = "container grow";

  setTimeout(() => {
    text.textContent = "Nefesini Tut!";

    setTimeout(() => {
      text.textContent = "Nefesini Ver!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

breathAnimation();

setInterval(breathAnimation, totalTime);
