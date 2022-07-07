"use strict";

import { activeButton, hamburgerButton, blackBackground } from "../navbar/hamburgerButton.js";

// container de l'exercice
const exerciceContainer = document.getElementById("exercice-container");
const exerciceInfo = document.querySelector(".exercice-infos");
const timerDiv = document.querySelector(".timer");
const noSessionDiv = document.querySelector(".no-exercices");

// Buttons
const btnLaunchSession = document.querySelector(".start-exercice");
const btnEndSet = document.querySelector(".end-set");
const btnPause = document.querySelector(".btn-pause");
const btnReset = document.querySelector(".btn-reset");
const btnEndRest = document.querySelector(".btn-end-rest");

// Les spans
const spanExerciceName = document.querySelector("span.exercice-name");
const spanMinutes = document.querySelector("span.minutes");
const spanSeconds = document.querySelector("span.seconds");
const spanReps = document.querySelector("span.reps");
const spanSets = document.querySelector("span.sets");
const spanPerformance = document.querySelector("span.performance");

let intervalId;

const exercices = [];

let actualExercice = {};

let timer = {
    minutes: 0,
    seconds: 0,
}

const main = async () => {

    const exercicesPhpData = await getExercicesFromDb();

    exercicesPhpData.forEach(exercice => {
        const exerciceObject = createExercice(exercice);
        exercices.push(exerciceObject);
    })

    if (exercices.length === 0) {
        displayNoSessionToday();
        return;
    }

    btnLaunchSession.addEventListener("click", launchSession);
    btnEndSet.addEventListener("click", launchTimer);
    btnReset.addEventListener("click", resetTimer);
    btnPause.addEventListener("click", pauseTimer);
    btnEndRest.addEventListener("click", endTimer);

    // HAMBURGER MENU
    hamburgerButton.addEventListener("click", activeButton);
    blackBackground.addEventListener("click", activeButton);
}

const getExercicesFromDb = async () => {
    return fetch('getDayExercices.php').then(response => response.json().then(response => {
        return response;
    }));
}

const createExercice = (exercice) => {

    let exerciceObject = {
        exerciceName: exercice.Name,
        placement: exercice.Placement,
        actualSet: 0,
        maxSets: exercice.Sets,
        setRest: exercice.Set_rest,
        reps: exercice.Reps,
        performance: exercice.Performance,
        exerciceRest: exercice.Exercice_rest
    }

    return exerciceObject;
}

const launchSession = () => {
    btnLaunchSession.style.display = "none";
    exerciceContainer.style.display = "flex";
    getActualExercice();
    displayExercice();
}

// TIMER FUNCTIONS
const launchTimer = () => {

    // Si l'exercice est vide, on récupère l'exo
    if (Object.keys(actualExercice).length === 0) {
        getActualExercice();
    }

    // Si l'exercice actuel a fini ses séries, on passe au suivant
    if (actualExercice.actualSet === actualExercice.maxSets) {
        goToNextExercice();
        return;
    }

    actualExercice.actualSet++;
    manageExerciceInfoDisplay();
    injectTimerDigits(actualExercice.setRest);
    manageTimerDivDisplay();
    displayExercice();
}

const endTimer = () => {
    clearInterval(intervalId);
    manageExerciceInfoDisplay();
    manageTimerDivDisplay();
}

const pauseTimer = () => {
    clearInterval(intervalId);
    btnPause.removeEventListener("click", pauseTimer);

    // change le nom du button en launch et mettre background color vert
    btnPause.innerText = "Reprendre";
    btnPause.style.backgroundColor = "green";

    // ajouter un event listener sur le button qui remove son event listener + qui appelle
    btnPause.addEventListener("click", swapToPauseBtn);
}

const swapToPauseBtn = () => {
    displayPauseBtn();
    injectTimerDigits((timer.minutes * 60) + timer.seconds);
}

const displayPauseBtn = () => {
    btnPause.removeEventListener("click", swapToPauseBtn);
    btnPause.addEventListener("click", pauseTimer);
    btnPause.innerText = "Pause";
    btnPause.style.backgroundColor = "red";
}

const resetTimer = () => {
    clearInterval(intervalId);
    displayPauseBtn();
    injectTimerDigits(actualExercice.setRest);
}

const injectTimerDigits = (seconds) => {

    timer.minutes = Math.trunc(seconds / 60);
    timer.seconds = seconds % 60;

    if (timer.seconds < 10) {
        spanSeconds.innerText = `0${timer.seconds}`;
    } else {
        spanSeconds.innerText = timer.seconds;
    }

    if (timer.minutes > 10) {
        spanMinutes.innerText = timer.minutes;
    } else {
        spanMinutes.innerText = `0${timer.minutes}`;
    }

    // à mettre dans un id pour mettre pause etc
    intervalId = setInterval(() => {

        console.log("timer enclenché");

        if (timer.seconds <= 0 && timer.minutes >= 1) {
            timer.seconds = 60;
            timer.minutes = timer.minutes - 1;

            if (timer.minutes > 10) {
                spanMinutes.innerText = timer.minutes;
            } else {
                spanMinutes.innerText = `0${timer.minutes}`;
            }

        }

        timer.seconds = timer.seconds - 1;

        if (timer.seconds >= 10) {
            spanSeconds.innerText = timer.seconds;
        }

        if (timer.seconds < 10) {
            spanSeconds.innerText = `0${timer.seconds}`;
        }

        if (timer.seconds <= 0 && timer.minutes === 0) {
            clearInterval(intervalId);
            manageExerciceInfoDisplay();
            manageTimerDivDisplay();
        }

    }, 1000)
}

// FONCTIONS EXERCICES

const displayNoSessionToday = () => {
    btnLaunchSession.style.display = "none";
    exerciceContainer.style.display = "flex";
    noSessionDiv.style.display = "flex";
    exerciceInfo.style.display = "none";
}

const displayExercice = () => {
    spanExerciceName.innerText = actualExercice.exerciceName;
    spanReps.innerText = actualExercice.reps;
    spanSets.innerText = actualExercice.actualSet + "/" + actualExercice.maxSets;
    spanPerformance.innerText = actualExercice.performance;
}

const getActualExercice = () => {
    actualExercice = exercices[0];
}

const goToNextExercice = () => {

    //remove de l'exercice actuel du tableau
    exercices.splice(0, 1);

    if (exercices.length === 0) {
        alert("Vous avez fini votre séance, bravo, à demain !");
        return;
    }

    // Sinon on lance le timer exo de l'actual exercice
    manageExerciceInfoDisplay();
    injectTimerDigits(actualExercice.exerciceRest);
    manageTimerDivDisplay();

    getActualExercice();
    displayExercice();

}

// Fonctions affichage
const manageExerciceInfoDisplay = () => {
    if (getComputedStyle(exerciceInfo, null).display === "none") {
        exerciceInfo.style.display = "flex";
    } else {
        exerciceInfo.style.display = "none";
    };
}

const manageTimerDivDisplay = () => {
    if (getComputedStyle(timerDiv, null).display === "none") {
        timerDiv.style.display = "flex";
    } else {
        timerDiv.style.display = "none";
    }
}


addEventListener("load", main);