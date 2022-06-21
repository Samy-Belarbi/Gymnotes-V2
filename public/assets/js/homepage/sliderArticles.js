"use strict";

// On récupère les slides et les boutons
export const sliderContainer = document.getElementById("slider-container");
export const slides = document.querySelector(".slides");
export const buttonRight = document.getElementById("button-right");
export const buttonLeft = document.getElementById("button-left");
export let slide = document.querySelectorAll(".slide");

// Je récupère les spans
export const spansCircleNl = sliderContainer.querySelectorAll("span");
export const spansCircle = Array.from(spansCircleNl);

spansCircle.forEach(span => {
  span.addEventListener("click", (event) => putSlideOnCorrectPlace(event.target))
})

// Interval de l'auto slide
export const interval = 3000;


export let index = 1;
export let slideId;

export const firstClone = slide[0].cloneNode(true); // Je clone le premier pour boucler
export const lastClone = slide[slide.length - 1].cloneNode(true); // Pareil ici

// Je leur donne un id
firstClone.id = "first-clone";
lastClone.id = "last-clone";

// Je les append
slides.append(firstClone);
slides.prepend(lastClone);


export const slideWidth = slide[index].clientWidth; // je récupère la taille de la slide

slides.style.transform = `translateX(${-slideWidth * index}px)`; // pour que ça cache le first clone

export const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

export const getSlides = () => document.querySelectorAll(".slide");

slides.addEventListener("transitionend", () => {
  slide = getSlides();

  if (slide[index].id === firstClone.id) {

    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(${-slideWidth * index}px)`;
    resetSpansOpacity();
    spansCircle[index - 1].style.opacity = 1;

    // remise à zéro
  }

  if (slide[index].id === lastClone.id) {
    slides.style.transition = "none";
    index = slide.length - 2;
    slides.style.transform = `translateX(${-slideWidth * index}px)`;
    resetSpansOpacity();
    spansCircle[index - 1].style.opacity = 1;
    // on se remet à la fin
  }
});

export const moveToNextSlide = () => {
  slide = getSlides();
  if (index >= slide.length - 1) return;
  index++;
  slides.style.transition = "0.7s ease-in-out";
  slides.style.transform = `translateX(${-slideWidth * index}px)`;
  resetSpansOpacity();

  if (index > spansCircle.length) {
    spansCircle[0].style.opacity = 1;
  } else {
    spansCircle[index - 1].style.opacity = 1;
  }

};

export const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slides.style.transition = '.7s ease-in-out';
  slides.style.transform = `translateX(${-slideWidth * index}px)`;
  resetSpansOpacity();
  if (index === 0) {
    spansCircle[spansCircle.length - 1].style.opacity = 1;
  } else {
    spansCircle[index - 1].style.opacity = 1;
  }
};

export const checkMouseOnSlider = () => {

  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideId);
  });

  if (window.innerWidth > 800) {
    sliderContainer.addEventListener("mouseleave", startSlide);
  }
  buttonRight.addEventListener("click", moveToNextSlide);
  buttonLeft.addEventListener("click", moveToPreviousSlide);

}

export const putSlideOnCorrectPlace = (target) => {
  const indexTarget = spansCircle.indexOf(target) + 1;

  resetSpansOpacity();
  target.style.opacity = 1;

  if (index === indexTarget) {
    return;
  }

  if (index > indexTarget) {
    index = indexTarget + 1;
    moveToPreviousSlide();
  }

  if (index < indexTarget) {
    index = indexTarget - 1;
    moveToNextSlide();
  }

}

const resetSpansOpacity = () => {
  spansCircle.forEach(span => {
    span.style.opacity = "0.5";
  })
}