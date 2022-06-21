"use strict";

import { startSlide, checkMouseOnSlider } from "./sliderArticles.js";
import { liTitles, selectCardFromList } from "./trackProgress.js";
import { typewriter } from "./typewriter.js";
import { moveIndicator, liHeader, hideIndicator } from "../navbar/navbar.js";

const main = () => {

    liHeader.forEach(li => {
        li.addEventListener("mouseover", (event) => moveIndicator(event.target));
    })

    liHeader.forEach(li => {
        li.addEventListener("mouseleave", hideIndicator);
    })

    liTitles.forEach(li => {
        li.addEventListener("click", (event) => selectCardFromList(event));
    })

    if (window.innerWidth > 800) {
        startSlide();
    }

    checkMouseOnSlider();

    typewriter();

}

window.addEventListener("load", main);