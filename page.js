// naye pages ka chhota script: sirf phone ka ☰ menu
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  menu.classList.toggle("open");
});

menu.addEventListener("click", function () {
  menu.classList.remove("open");
});
