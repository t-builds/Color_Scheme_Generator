const form = document.querySelector("form");
const colorInput = document.getElementById("type-color");
const modeSelect = document.getElementById("mode");
const colorDivs = document.querySelectorAll(".color");
const colorTextDivs = document.querySelectorAll(".color-text");

document.querySelectorAll("span").forEach((span) => {
  span.addEventListener("mouseenter", () => {
    const randomColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
    span.style.color = randomColor;

    span.style.animation = "none";
    span.offsetHeight; // force reflow
    span.style.animation = "swing 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards";

    setTimeout(() => {
      span.style.color = "white";
      span.style.animation = "none";
    }, 1500);
  });
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let colorsArray = [];
  const hex = colorInput.value.slice(1);
  const mode = modeSelect.value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=6`)
    .then((res) => res.json())
    .then((data) => {
      for (let color of data.colors) {
        colorsArray.push(color.hex.clean);
      }

      colorsArray.forEach((color, i) => {
        colorDivs[i].style.backgroundColor = `#${color}`;
        colorTextDivs[i].textContent = `#${color}`;
      });
    });
});

document.querySelectorAll(".color-text").forEach((el) => {
  el.addEventListener("click", () => {
    const original = el.textContent.trim();
    navigator.clipboard.writeText(original);
    el.textContent = "✓ Copied!";
    el.style.opacity = "0.8";
    setTimeout(() => {
      el.textContent = original;
      el.style.opacity = "";
    }, 1000);
  });
});
