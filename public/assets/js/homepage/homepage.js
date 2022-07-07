"use strict";

import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";
import { startSlide, checkMouseOnSlider } from "./sliderArticles.js";
import { imgCards, liTitles, selectCardFromList, selectListFromCard } from "./trackProgress.js";
import { typewriter } from "./typewriter.js";
import { moveIndicator, liHeader, hideIndicator } from "../navbar/navbar.js";

const main = () => {

    // TYPEWRITER
    typewriter();

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

    // Tracker
    liTitles.forEach(li => {
        li.addEventListener("click", (event) => selectCardFromList(event));
    })

    imgCards.forEach(card => {
        card.addEventListener("click", (event) => selectListFromCard(event));
    })

}

addEventListener("load", main);