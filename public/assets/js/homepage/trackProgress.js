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

    // On met l'opacité des sélectionnés
    e.target.style.opacity = 1;
    spansCircles[indexInArray].style.opacity = 1;

    // On affiche la card correspondante à l'index
    showCard(indexInArray);

}

const putAllToDefaultOpacity = () => {
    liTitles.forEach(li => {
        li.style.opacity = 0.5;
    })

    spansCircles.forEach(span => {
        span.style.opacity = 0.5;
    })
}

const showCard = (indexInArray) => {

    // On reset toutes les cards à la width de base
    resetCards();

    // On met la card selectionné à la taille 
    const selectedCard = imgCards[indexInArray];
    selectedCard.style.width = "400px";
    selectedCard.style.zIndex = 3;

    // On met la card au milieu
    selectedCard.style.left = "240px";
    
    // On les replace toutes
    let left = 0;
    imgCards.forEach(card => {

        left = left + 80;

        if (imgCards.indexOf(card) !== imgCards.indexOf(selectedCard)) {

            if (imgCards.indexOf(card) === 4) {
                left = 400;
            }

            card.style.left = `${left}px`;
        }
        
    })

}

const resetCards = () => {
    imgCards.forEach(card => {
        card.style.width = "300px";
        card.style.zIndex = 2;
    })
}