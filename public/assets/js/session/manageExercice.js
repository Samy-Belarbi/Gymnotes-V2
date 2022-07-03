import { removeDay, findDayNameIndex, days } from "./manageDays.js";

// FONCTION QUI CREE UN EXO
export const createExercice = (dayName, numberOfExercice) => {
    const divExercice = divGenerator("exercice");

    // DIV EXERCICE NAME
    const divExerciceName = divGenerator("exercice-name");
    divExercice.append(divExerciceName);

    const labelExerciceName = labelGenerator(`exo-${dayName}-${numberOfExercice}`, "Nom de l'exercice :");
    divExerciceName.append(labelExerciceName);

    const inputExerciceName = inputGenerator("text", labelExerciceName.getAttribute("for"));
    inputExerciceName.minLength = 2;
    inputExerciceName.maxLength = 30;
    divExerciceName.append(inputExerciceName);

    // DIV SETS
    const divSets = divGenerator("sets");
    divExercice.append(divSets);

    const labelSet = labelGenerator(`set-${dayName}-${numberOfExercice}`, "Nombre de séries :");
    divSets.append(labelSet);

    const selectSet = selectGenerator(labelSet.getAttribute("for"));
    divSets.append(selectSet);

    for (let i = 0; i < 10; i++) {
        let optionSet = optionGenerator(i, i);
        selectSet.append(optionSet);
    }

    // DIV REPS
    const divReps = divGenerator("reps");
    divExercice.append(divReps);

    const labelReps = labelGenerator(`reps-${dayName}-${numberOfExercice}`, "Nombre de répétitions :");
    divReps.append(labelReps);

    const selectReps = selectGenerator(labelReps.getAttribute("for"));
    divReps.append(selectReps);

    for (let i = 0; i < 50; i++) {
        let optionReps = optionGenerator(i, i);
        selectReps.append(optionReps);
    }

    // DIV PERFORMANCE
    const divPerformance = divGenerator("performance");
    divExercice.append(divPerformance);

    const labelPerformance = labelGenerator(`performance-${dayName}-${numberOfExercice}`, "Infos performance :");
    divPerformance.append(labelPerformance);

    const inputPerformance = inputGenerator("text", labelPerformance.getAttribute("for"));
    divPerformance.append(inputPerformance);

    // DIV SETS REST
    const divSetRest = divGenerator("set-rest");
    divExercice.append(divSetRest);

    const labelSetRest = labelGenerator(`setrest-${dayName}-${numberOfExercice}`, "Repos entre les séries :");
    divSetRest.append(labelSetRest);

    const selectSetRest = selectGenerator(labelSetRest.getAttribute("for"));
    divSetRest.append(selectSetRest);

    for (let i = 0; i < 480; i += 15) {

        let textSecondsOrMinutes;

        if (i < 60) {
            textSecondsOrMinutes = `${i}s`;
        } else {
            let minutes = 0;
            let seconds = i;

            while (seconds >= 60) {
                minutes++;
                seconds = seconds - 60;
                if (seconds === 0) {
                    seconds = "00";
                }
            }

            textSecondsOrMinutes = `${minutes}m${seconds}s`;
        }

        let optionSetRest = optionGenerator(i, textSecondsOrMinutes);
        selectSetRest.append(optionSetRest);
    }

    // DIV EXERCICE REST
    const divExoRest = divGenerator("exo-rest");
    divExercice.append(divExoRest);

    const labelExoRest = labelGenerator(`exorest-${dayName}-${numberOfExercice}`, "Repos avant le prochain exercice : ");
    divExoRest.append(labelExoRest);

    const selectExoRest = selectGenerator(labelExoRest.getAttribute("for"));
    divExoRest.append(selectExoRest);

    for (let i = 0; i < 480; i += 15) {

        let textSecondsOrMinutes;

        if (i < 60) {
            textSecondsOrMinutes = `${i}s`;
        } else {
            let minutes = 0;
            let seconds = i;

            while (seconds >= 60) {
                minutes++;
                seconds = seconds - 60;
                if (seconds === 0) {
                    seconds = "00";
                }
            }

            textSecondsOrMinutes = `${minutes}m${seconds}s`;
        }

        let optionExoRest = optionGenerator(i, textSecondsOrMinutes);
        selectExoRest.append(optionExoRest);
    }

    // Le button remove d'exercice
    const buttonRemoveExercice = buttonGenerator("button", "remove-exercice", "-");
    divExercice.append(buttonRemoveExercice);
    buttonRemoveEvent(buttonRemoveExercice);

    return divExercice;
}

// ADD UN EXERCICE
const addExercice = (event) => {

    const session = event.target.parentNode;
    const divExercices = session.querySelector("div.exercices");
    const dayName = session.id;

    const numberOfExercice = divExercices.childElementCount;

    if (numberOfExercice >= 9) {
        window.alert("Maximum d'exercices atteint !")
        return;
    }

    divExercices.append(createExercice(dayName, numberOfExercice + 1));
}

// REMOVE L'EXO
const removeExercice = (event) => {
    const divExercice = event.target.parentNode;
    const divExercices = divExercice.parentNode;
    const placeOfDiv = Array.prototype.indexOf.call(divExercices.children, divExercice) + 1;

    divExercices.removeChild(divExercice);

    if (divExercices.childElementCount < 1) {
        let day = divExercices.parentNode.id;
        removeDay(day);
        days[findDayNameIndex(day)].classList.remove("checked");
        days[findDayNameIndex(day)].nextElementSibling.checked = false;

        return;
    }

    // AJOUTER UNE FONCTION QUI REORGANISE TOUS LES NAMES DES INPUTS ET SELECT
    reorganizeNames(placeOfDiv, divExercices);
}

// Manager d'event
export const buttonAddEvent = (button) => {
    button.addEventListener("click", (event) => addExercice(event));
}

const buttonRemoveEvent = (button) => {
    button.addEventListener("click", (event) => removeExercice(event));
};

// REORGANISATION AU DELETE D'UN EXO
const reorganizeNames = (number, parent) => {
    const inputs = parent.querySelectorAll("input");
    const labels = parent.querySelectorAll("label");
    const selects = parent.querySelectorAll("select");

    inputs.forEach(input => {
        putMinusOneNames(input, number);
    })

    labels.forEach(label => {
        putMinusOneFor(label, number);
    })

    selects.forEach(select => {
        putMinusOneNames(select, number);
    })

}

const putMinusOneNames = (element, number) => {
    const lastCharacOfElement = element.name.charAt(element.name.length -1);
    const nameOfElementWithoutLastString = element.name.slice(0, -1);
    const numberOfElement = parseInt(lastCharacOfElement);
    
    if (numberOfElement > number) {
        element.name = nameOfElementWithoutLastString + (numberOfElement - 1);
    }
}

const putMinusOneFor = (element, number) => {
    const lastCharacOfElement = element.for.charAt(element.for.length -1);
    const nameOfElementWithoutLastString = element.for.slice(0, -1);
    const numberOfElement = parseInt(lastCharacOfElement);
    
    if (numberOfElement > number) {
        element.for = nameOfElementWithoutLastString + (numberOfElement - 1);
    }
}

// LES GENERATORS D'ELEMENTS
export const divGenerator = (className) => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
}

export const h4Generator = (dayName) => {
    const h4 = document.createElement("h4");
    h4.innerText = dayName;
    return h4;
}

export const buttonGenerator = (type, className, innerText) => {
    const button = document.createElement("button");
    button.type = type;
    button.classList.add(className);
    button.innerText = innerText;
    return button;
}

const labelGenerator = (forName, innerText) => {
    const label = document.createElement("label");
    label.setAttribute("for", forName);
    label.innerText = innerText;

    return label;
}

const inputGenerator = (type, labelFor) => {
    const input = document.createElement("input");
    input.type = type;
    input.name = labelFor;
    input.required;

    return input;
}

const optionGenerator = (value, nameOption) => {
    const optionValue = document.createElement("option");
    optionValue.value = value;
    optionValue.innerText = nameOption;

    return optionValue;
}

const selectGenerator = (nameSelect) => {
    const select = document.createElement("select");
    select.name = nameSelect;
    select.required;

    return select;
}