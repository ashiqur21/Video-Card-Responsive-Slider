const sliderContent = document.querySelector(".slider-content");
const slides = document.querySelectorAll(".slide-card");
const dots = document.querySelectorAll(".slider-dot");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlideIndex = 0;
let autoSlideInterval;

function updateSlidePosition() {
  const slideWidth = slides[0].offsetWidth;
  sliderContent.style.transform = `translateX(-${
    currentSlideIndex * slideWidth
  }px)`;
  updateDots();
  updateButtons();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });
}

function updateButtons() {
  prevButton.disabled = currentSlideIndex === 0;
  nextButton.disabled = currentSlideIndex === slides.length - 1;
}

function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    currentSlideIndex = index;
    updateSlidePosition();
  }
}

function slideNext() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0;
  }
  updateSlidePosition();
}

function slidePrev() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1;
  }
  updateSlidePosition();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(slideNext, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event Listeners
nextButton.addEventListener("click", slideNext);
prevButton.addEventListener("click", slidePrev);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"));
    goToSlide(index);
  });
});

window.addEventListener("resize", updateSlidePosition);

document.querySelector(".sliders").addEventListener("mouseover", stopAutoSlide);
document
  .querySelector(".sliders")
  .addEventListener("mouseleave", startAutoSlide);

// Init
updateSlidePosition();
startAutoSlide();
