"use strict";

const editButton = document.querySelector(".edit-button");

editButtons.forEach(button => {
    button.addEventListener("click", (event) => makeEditable(event));
})

const main = () => {
    console.log(editButtons);
}

const makeEditable = (event) => {
    // Transformer l'élément précédent en input puis ajouter un button pour submit
    const parent = event.target.parentNode;
    const previousElement = event.target.previousElementSibling;

    createInput(previousElement.text)
    
    parent.removeChild(previousElement);
}

addEventListener("load", main);