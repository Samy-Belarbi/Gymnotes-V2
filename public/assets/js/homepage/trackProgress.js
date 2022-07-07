export const divTitles = document.getElementById("titles");
export const allLi = divTitles.querySelectorAll("li");
export const liTitles = Array.from(allLi);
export const spansCircles = divTitles.querySelectorAll("span");

export const allCards = document.querySelectorAll("#cards-images li");
export const imgCards = Array.from(allCards);


export const selectCardFromList = (e) => {

    // On met l'opacité de base à tous
    putAllToDefaultOpacity();

    // On récupère l'index de la target pour l'associer au numéro du span
    const indexInArray = liTitles.indexOf(e.target);

    putOpacityToSelected(indexInArray);

    // On affiche la card correspondante à l'index
    showCard(indexInArray);

}

export const selectListFromCard = (e) => {
    putAllToDefaultOpacity();

    const indexCard = imgCards.indexOf(e.target.parentNode);

    showCard(indexCard);

     // On met l'opacité des sélectionnés
     putOpacityToSelected(indexCard);
}

const putAllToDefaultOpacity = () => {
    liTitles.forEach(li => {
        li.style.opacity = 0.5;
    })

    spansCircles.forEach(span => {
        span.style.opacity = 0.5;
    })
}

const showCard = (index) => {

    // On reset toutes les cards à la width de base
    resetCards();

    // On met la card selectionné à la taille 
    const selectedCard = imgCards[index];
    selectedCard.style.overflow = "visible";
    selectedCard.style.transform = "scale(1.1) translate(-10%)";
    setTimeout(() => selectedCard.style.transform = "translate(0%)", 300);
    selectedCard.style.opacity = 1;
    selectedCard.style.zIndex = 5;

}

const resetCards = () => {
    imgCards.forEach(card => {
        card.style.overflow = "hidden";
        card.style.opacity = 0.5;
        card.style.transform = "scale(1)";
        card.style.zIndex = 1;
    })
}

const putOpacityToSelected = (index) => {
    liTitles[index].style.opacity = 1;
    spansCircles[index].style.opacity = 1;
}