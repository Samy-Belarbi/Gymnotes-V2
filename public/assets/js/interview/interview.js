"use strict";

import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";

import { buttonValid, divButtons, makeSlideToRight, widthLi } from "./slider.js";

import { check, labels } from "./checkRadio.js";

import { responsiveSlider } from "./mobileVersion.js";


const main = () => {

    if (window.innerWidth > 1000) {
        buttonValid.addEventListener("click", makeSlideToRight);
    }

    if (window.innerWidth <= 1000) {
        responsiveSlider();
    }

    // HAMBURGER MENU
    hamburgerButton.addEventListener("click", activeButton);
    blackBackground.addEventListener("click", activeButton);

}

addEventListener("load", main);