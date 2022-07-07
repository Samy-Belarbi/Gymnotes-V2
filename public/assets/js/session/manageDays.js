import { buttonAddEvent, createExercice, divGenerator, h4Generator, buttonGenerator } from "./manageExercice.js";

const divSessions = document.getElementById("sessions");

// DAYS
const divDays = document.getElementById("days");
export const days = divDays.querySelectorAll("label");
const daysArray = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
let selectedDaysArray = [];
selectedDaysArray.length = daysArray.length;

days.forEach(day => {
    day.addEventListener("click", (event) => check(event));
})

// FONCTION CHECK
export const check = (event) => {

    // event.target = label;
    const input = event.target.nextElementSibling;
    const dayName = input.name;

    if (!input.checked) {
        addClassToLabel(event);
        input.checked = true;
        createDay(dayName);
        displayForm();
        return;
    };

    if (input.checked
        && window.confirm("Êtes-vous sûr de vouloir supprimer la séance ?")) {
        removeClassToLabel(event);
        input.checked = false;
        removeDay(dayName);
        displayForm();
        return;
    };

};

// FONCTIONS ADD OU REMOVE CLASSES
const addClassToLabel = (event) => {
    event.target.classList.add("checked");
}

const removeClassToLabel = (event) => {
    event.target.classList.remove("checked");
}

// FONCTION CREATION DE JOUR
const createDay = (dayName) => {
    if (!checkIfDayAlreadyCreated(dayName)) {
        selectedDaysArray.splice(findDayNameIndex(dayName), 1, dayName);
        dayGenerator(dayName);
    }
};

// FONCTION REMOVE DE JOUR 
export const removeDay = (dayName) => {
    selectedDaysArray.splice(findDayNameIndex(dayName), 1, null);
    const dayToRemove = document.getElementById(dayName);
    divSessions.removeChild(dayToRemove);
};

// FONCTION QUI CREE L'HTML D'UN JOUR
const dayGenerator = (dayName) => {

    // DIV SESSION
        const divSession = divGenerator("session");
        divSession.id = dayName;

    // H4 avec le nom du jour
        const h4 = h4Generator(dayName);
        divSession.append(h4);

    // La div qui va contenir les exercices
        const divExercices = divGenerator("exercices");
        divSession.append(divExercices);

    // La div qui va contenir l'exercice
        const divExercice = createExercice(dayName, 1);
        divExercices.append(divExercice);

    // Le button d'ajout d'exercice
        const buttonAddExercice = buttonGenerator("button", "add-exercice", "+");
        divSession.append(buttonAddExercice);
        buttonAddEvent(buttonAddExercice);

    let indexSuperior = findIndexSuperior(dayName);

    // -1 car ça veut dire qu'il y en a pas
    if (indexSuperior === -1) {
        divSessions.append(divSession);
        return;
    }

    const divSuperior = document.getElementById(selectedDaysArray[indexSuperior]);
    divSessions.insertBefore(divSession, divSuperior);

};

// // LES HELPERS

// FONCTION QUI TROUVE L'INDEX SUPERIEUR S'IL EXISTE
const findIndexSuperior = (dayName) => {
    const dayIndex = selectedDaysArray.indexOf(dayName);
    return selectedDaysArray.findIndex((day, index) => index > dayIndex && typeof day === "string");
}

// FONCTION QUI VERIFIE SI LE JOUR EXISTE DEJA
const checkIfDayAlreadyCreated = (dayName) => {
    if (selectedDaysArray.includes(dayName)) {
        return true;
    }

    return false;

}

// FONCTION TROUVE L'INDEX DU JOUR SELECTIONNE
export const findDayNameIndex = (dayName) => {
    return daysArray.indexOf(dayName);
};

// FONCTION DISPLAY FORM OU NON
const displayForm = () => {
    
    const form = document.getElementById("sessions-container");

    if (!daysArray.some(day => selectedDaysArray.indexOf(day) >= 0)) {
        form.style.display = "none";
    } else {
        form.style.display = "flex";
    }

}

