import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";
import { moveIndicator, liHeader, hideIndicator } from "../navbar/navbar.js";

if (window.innerWidth > 1357) {

    // HEADER
    liHeader.forEach(li => {
        li.addEventListener("mouseover", (event) => moveIndicator(event.target));
    });

    liHeader.forEach(li => {
        li.addEventListener("mouseleave", hideIndicator);
    });

    // SLIDER ARTTICLES
    startSlide();
    checkMouseOnSlider();

}

// HAMBURGER MENU
hamburgerButton.addEventListener("click", activeButton);
blackBackground.addEventListener("click", activeButton);