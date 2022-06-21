export const header = document.querySelector("header");
export const liHeader = header.querySelectorAll("li");
export const indicator = document.querySelector(".indicator");

export const moveIndicator = (event) => {
    let left = event.offsetLeft;
    let widthTarget = `${event.offsetWidth}px`;

    indicator.style.opacity = 1;
    indicator.style.width = widthTarget;
    indicator.style.left = `${left}px`;
}

export const hideIndicator = () => {
    indicator.style.opacity = 0;
    indicator.style.left = "0px";
}