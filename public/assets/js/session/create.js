"use strict";

import { check } from "./manageDays.js";

const buttonSendSessions = document.getElementById("send-sessions");

const main = () => {
    buttonSendSessions.addEventListener("click", checkForm);
}

const checkForm = () => {
    const form = document.querySelector("form");

    const allExercices = document.querySelectorAll(".exercice");

    allExercices.forEach(exercice => {
        const parentExercice = exercice.parentNode.parentNode;
        const inputs = exercice.querySelectorAll("input");
        const selects = exercice.querySelectorAll("select");

        const exerciceConvertedToObject = exerciceObject(parentExercice.id, inputs[0].name.charAt(inputs[0].name.length -1), inputs[0].value, selects[0].value, selects[1].value, inputs[1].value, selects[2].value, selects[3].value);

        console.log(exerciceConvertedToObject);

    })

    const formData = new FormData(form);

}

const exerciceObject = (day, placement, name, sets, reps, perf, setsRest, exoRest) => {
    let exercice = {
        day: day,
        placement : placement,
        name : name,
        sets : sets,
        reps : reps,
        perf : perf,
        setsRest : setsRest,
        exoRest : exoRest
    }

    return exercice;
}


window.addEventListener("load", main);