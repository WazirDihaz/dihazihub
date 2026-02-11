const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 2000);

  const words = [ "Himalayan Shilajit",
    "Gilgiti Shilajit",
    "Baltistan Shilajit",
    "Karakoram Shilajit",
    "Pure Natural Shilajit"];
  let i = 0;

  function changeText() {
    document.getElementById("dynamic-text").innerText = words[i];
    i = (i + 1) % words.length; // loop back to start
  }

  changeText(); // show first word immediately
  setInterval(changeText, 2000);