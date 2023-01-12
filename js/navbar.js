/********************************
             NAVBAR
********************************/

/********************************
            Variables
********************************/

const navBar = document.getElementById("navbar__container");
const buttonClose = document.getElementById("close__button");
const buttonOpen = document.getElementById("hamburguer__button");


/********************************
            Eventos
********************************/

buttonClose.addEventListener("click", closeNav = (e) => {
  e.preventDefault();
  navBar.style.left = "100%";
});

buttonOpen.addEventListener("click", openNav = (e) => {
  e.preventDefault();
  navBar.style.left = "0%";
});