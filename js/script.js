/********************************
             NAVBAR
********************************/
const navBar = document.getElementById("nav__bar");
const buttonClose = document.getElementById("nav__button--close");
const buttonOpen = document.getElementById("nav__button--open");

buttonClose.addEventListener("click", closeNav = (e) => {
        e.preventDefault();
        navBar.style.width = "0%";
});

buttonOpen.addEventListener("click", openNav = (e) => {
        e.preventDefault();
        navBar.style.width = "100%";
});