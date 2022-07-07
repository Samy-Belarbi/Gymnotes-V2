"use strict";

import { buttonValid, numberOfLi, divButtons, buttonCreator, buttonValidExist} from "./slider.js";

import { labels } from "./checkRadio.js";

let buttonGenerateExistMobile = false;
let buttonValidExistMobile = true;

export const responsiveSlider = () => {
    buttonValid.addEventListener("click", checkInputs);

    labels.forEach(label => {
        label.addEventListener("click", checkInputsFromLabel)
    })
}

export const checkInputs = () => {

    const inputsChecked = document.querySelectorAll("input:checked");

    if (inputsChecked.length === numberOfLi) {
        const p = divButtons.querySelector("p");
        if (divButtons.querySelectorAll("p").length >= 1) {
            divButtons.removeChild(p);
        }
        if (!buttonGenerateExistMobile) {
            createButtonGenerateForMobile();
        }
    }

    else {
        alertNeedToCheckInputs();
    }

}

export const checkInputsFromLabel = () => {

    const inputsChecked = document.querySelectorAll("input:checked");

    if (inputsChecked.length < numberOfLi
        && buttonGenerateExistMobile) {
            removeButtonGenerateForMobile();
        }


    if (inputsChecked.length === numberOfLi) {
        const p = divButtons.querySelector("p");

        if (divButtons.querySelectorAll("p").length >= 1) {
            divButtons.removeChild(p);
        }

        if (buttonValidExistMobile) {
            removeValidButtonForMobile();
        }

        if (!buttonGenerateExistMobile) {
            createButtonGenerateForMobile();
        }

    }

}

export const alertNeedToCheckInputs = () => {
    const buttonValidMobile = document.getElementById("buttonValid");
    buttonValidMobile.style.animation = "shake 0.3s ease-in-out";
    buttonValidMobile.style.outline = "1px solid red";

    const numberOfP = divButtons.querySelectorAll("p").length;

    if (numberOfP < 1) {
        const p = document.createElement("p");
        p.innerText = "Veuillez répondre à toutes les questions !"
    
        divButtons.prepend(p);
    }
    setTimeout(() => {
        buttonValidMobile.style.animation= "";
        buttonValidMobile.style.outline= "none";
    }, 1000);
}

export const createButtonGenerateForMobile = () => {
    const button = buttonCreator("buttonGenerate", "Je génère mon programme");
    button.type = "submit";
    button.id = "buttonGenerate";

    buttonGenerateExistMobile = true;

    if (buttonValidExistMobile) {
        removeValidButtonForMobile();
    }

    divButtons.append(button);

}

export const createButtonValidForMobile = () => {
    const button = buttonCreator("buttonGenerate", "Valider");
    button.type = "button";
    button.id = "buttonValid";
    button.addEventListener("click", checkInputs);
    
    if (buttonGenerateExistMobile) {
        removeButtonGenerateForMobile();
    }

    divButtons.append(button);
    buttonValidExistMobile = true;

}

export const removeValidButtonForMobile = () => {
    const buttonValid = document.getElementById("buttonValid");
    divButtons.removeChild(buttonValid);
    buttonValidExistMobile = false;
}

export const removeButtonGenerateForMobile = () => {
    const buttonGenerate = document.getElementById("buttonGenerate");
    divButtons.removeChild(buttonGenerate);
    buttonGenerateExistMobile = false;
    createButtonValidForMobile();
}

