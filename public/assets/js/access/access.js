"use strict";

import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";

const main = () => {
    insertAgeOptions();
}

export const insertAgeOptions = () => {

    const selectAge = document.getElementById("age");

    for (let i = 15; i < 120; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = `${i} ans`;
        selectAge.appendChild(option);
    }
    
    // HAMBURGER MENU
    hamburgerButton.addEventListener("click", activeButton);
    blackBackground.addEventListener("click", activeButton);
    
}


addEventListener("load", main);