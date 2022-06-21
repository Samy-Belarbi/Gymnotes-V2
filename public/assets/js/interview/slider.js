import { inputs, checkPermaInputsChecked } from "./checkRadio.js";

// SLIDER
export const sliderInterview = document.getElementById("slider-interview");

// LI
export const li = sliderInterview.querySelector("li");
export const widthLi = li.offsetWidth;
export const arrayLi = sliderInterview.querySelectorAll("li");
export const numberOfLi = arrayLi.length;

// BUTTON
export const divButtons = document.querySelector(".buttons");
export const buttonValid = document.getElementById("buttonValid");
export let buttonGenerateExist = false;
export let buttonValidExist = true;

// POSITION OF SCROLL
export let position = {
    MAX: (numberOfLi - 1) * widthLi,

    x: 0,
}

// MAKE SLIDE
export const makeSlideToRight = () => {

    if (divButtons.children.length <= 1
        && checkPermaInputsChecked()) {
        createButtonBack();
    }

    if (position.x < position.MAX
        && checkPermaInputsChecked()) {

        position.x = position.x + widthLi;
        sliderInterview.scroll(position.x, 0);
    }

    if (inputs.checked === numberOfLi) {
        createButtonGenerate();
    }

    if (inputs.checked < numberOfLi) {
        checkPermaInputsChecked();
    }

}

export const makeSlideToLeft = () => {

    if (position.x <= position.MAX) {
        position.x = position.x - widthLi;
        sliderInterview.scroll(position.x, 0);

    }

    if (buttonGenerateExist) {
        removeButtonGenerate();
    }

    if (position.x < widthLi) {
        removeButtonBack();
    }
}

// BUTTON BACK
export const createButtonBack = () => {
    const button = buttonCreator("buttonGoBack", "<", makeSlideToLeft);
    button.type = "button";

    divButtons.prepend(button);
}

export const removeButtonBack = () => {
    const buttonBack = document.getElementById("buttonGoBack");
    divButtons.removeChild(buttonBack);
}

// BUTTON GENERATE
export const createButtonGenerate = () => {

    if (position.x === position.MAX
        && !buttonGenerateExist) {

        const button = buttonCreator("buttonGenerate", "Je génère mon programme", createSession);
        button.type = "submit";

        buttonGenerateExist = true;

        removeValidButton();

        divButtons.append(button);
    }
}

export const removeButtonGenerate = () => {
    const buttonGenerate = document.getElementById("buttonGenerate");
    divButtons.removeChild(buttonGenerate)
    buttonGenerateExist = false;
    createButtonValid();
}

// BUTTON VALID
export const createButtonValid = () => {

    if (!buttonValidExist) {
        const button = buttonCreator("buttonValid", "Valider", makeSlideToRight);
        button.type = "button";
        divButtons.append(button);
        buttonValidExist = true;
    }

}

export const removeValidButton = () => {

    if (buttonValidExist) {
        const buttonValid = document.getElementById("buttonValid");
        divButtons.removeChild(buttonValid);
        buttonValidExist = false;
    }

}

// GENERATE SESSION
export const createSession = () => {
    if (inputs.checked === numberOfLi) {
        console.log("Programme généré");
    }
}

// FONCTION CREATOR DE BUTTONS
export const buttonCreator = (id, innerText, functionCalled) => {
    const button = document.createElement("button");
    button.id = id;
    button.innerText = innerText;
    if (functionCalled === undefined) {
        return button;
    }
    button.addEventListener("click", functionCalled);
    return button;
}