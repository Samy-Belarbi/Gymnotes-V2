"use strict";

import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";
import { check } from "./manageDays.js";

const form = document.getElementById("form-sessions");

const main = () => {
    form.addEventListener("submit", (event) => checkForm(event));

    // HAMBURGER MENU
    hamburgerButton.addEventListener("click", activeButton);
    blackBackground.addEventListener("click", activeButton);
}

const checkForm = (e) => {

    e.preventDefault();
    const allExercices = document.querySelectorAll(".exercice");
    const formData = new FormData();

    // check si tous les inputs sont remplis
    if (checkInputs(allExercices, formData)) {
        insertToDb(formData);
    } 

}

const exerciceObject = (day, placement, name, sets, reps, perf, setsRest, exoRest) => {
    let exercice = {
        day: day,
        placement: placement,
        name: name,
        sets: sets,
        reps: reps,
        perf: perf,
        setsRest: setsRest,
        exoRest: exoRest
    }

    return exercice;
}

const insertToDb = (formData) => {
    fetch('insertSession.php', {
        method: "post",
        body: formData
    })
    .then(response => response.text())
    .then(window.location.href = "/session")
    .catch(error => console.error(error));
}

const checkInputs = (exercices, formData) => {

    let validForm = true;

    exercices.forEach(exercice => {
        const parentExercice = exercice.parentNode.parentNode;
        const inputs = exercice.querySelectorAll("input");
        const selects = exercice.querySelectorAll("select");
        exercice.style.border = "none";

        if (parentExercice.querySelector("p") !== null) {
            parentExercice.removeChild(parentExercice.querySelector("p"));
        }

        const exerciceConvertedToObject = exerciceObject(parentExercice.id, parseInt(inputs[0].name.charAt(inputs[0].name.length - 1)), inputs[0].value, selects[0].value, selects[1].value, inputs[1].value, selects[2].value, selects[3].value);

        const objToArray = Object.values(exerciceConvertedToObject);

        if (objToArray.some(value => value.length < 1)) {

            if (parentExercice.querySelector("p") === null) {
                const p = document.createElement("p");
                p.innerText = "Veuillez remplir tous les champs";
                p.style.color = "red";
                parentExercice.append(p);
            }

            exercice.classList.add("shake");
            exercice.style.border = "1px solid red";
            setTimeout(() => exercice.classList.remove("shake"), 1000);

            validForm = false;

        } else {
            formData.append(parentExercice.id + '-' + inputs[0].name.charAt(inputs[0].name.length - 1), JSON.stringify(exerciceConvertedToObject));    
        }

    });

    return validForm;
}


window.addEventListener("load", main);