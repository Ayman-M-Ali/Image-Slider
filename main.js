// Get elements
const slides = document.querySelectorAll(".slider img");
const prevBtn = document.querySelector(".left");
const nextBtn = document.querySelector(".right");
const imgId = document.querySelector(".img-id");
const thumbnailContainer = document.querySelector(".thumbnail-container");

// Initialize variables
let currentSlide = 0;
let intervalSlideAuto;

// Set up event listeners
prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
  clearInterval(intervalSlideAuto);
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
  clearInterval(intervalSlideAuto);
});

// Initialize thumbnail grid
thumbnailContainer.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`;
slides.forEach((img, index) => {
  const thumbnail = img.cloneNode();
  thumbnail.addEventListener('click', () => {
    goToSlide(index);
    clearInterval(intervalSlideAuto);
  });
  thumbnailContainer.appendChild(thumbnail);
});

// Functions
function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  buttonControl();
  imgThumbnailActive(currentSlide);
}

function buttonControl() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  imgId.innerHTML = `Image ${currentSlide + 1}`;
}

function imgThumbnailActive(index) {
  thumbnailContainer.querySelectorAll('img').forEach((img, i) => {
    img.classList.toggle("active", i === index);
    img.style.opacity = i === index ? 1 : 0.3; // Adjust opacity as needed
  });
}

function startAutoPlay() {
  intervalSlideAuto = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

// Call startAutoPlay func and goToSlide func when the page loads
window.onload = function() {
  goToSlide(0); // Set the first slide as active
  startAutoPlay();
};