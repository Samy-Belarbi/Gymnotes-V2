export const hamburgerButton = document.getElementById("hamburger-button");
export const header = document.querySelector("header");
export const blackBackground = document.getElementById("black-background");

export let buttonActivated = false;

export const activeButton = () => {  

    if (!buttonActivated) {
        hamburgerButton.classList.add("active");
        hamburgerButton.style.transform = `translateX(${header.offsetWidth - 50}px)`
        header.style.transform = "translateX(0)";
        blackBackground.style.transform = "translateX(0)";

        buttonActivated = true;
        
    } else {
        hamburgerButton.classList.remove("active");
        hamburgerButton.style.transform = "translateX(0px)"
        header.style.transform = `translateX(-${header.offsetWidth}px)`;
        blackBackground.style.transform = "translateX(-100vw)";

        buttonActivated = false;
    }
}