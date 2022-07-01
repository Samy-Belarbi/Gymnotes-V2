"use strict";

const main = () => {
    insertAgeOptions();
}

const insertAgeOptions = () => {

    const selectAge = document.getElementById("age");

    for (let i = 15; i < 120; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = `${i} ans`;
        selectAge.appendChild(option);
    }
}


addEventListener("load", main);