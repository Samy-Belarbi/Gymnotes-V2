"use strict";

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
    
}

addEventListener("load", main);