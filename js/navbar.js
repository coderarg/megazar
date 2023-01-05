/********************************
             NAVBAR
********************************/

/********************************
            Variables
********************************/

const navBar = document.getElementById("navbar__container");
const buttonClose = document.getElementById("close__button");
const buttonOpen = document.getElementById("hamburguer__button");

const filterbar = document.getElementById("filterbar");
const filterButton = document.getElementById("filter__button");

let filterActive = true;

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


//Filter Bar

filterButton.addEventListener("click", openFilter = (e) => {
  e.preventDefault


  if(filterActive == true)
  {filterbar.style.top = "51px";
    filterActive = false;
  }else{
    filterbar.style.top = "-500px";
    filterActive = true;
  }

})