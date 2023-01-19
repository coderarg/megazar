/********************************
            Variables
********************************/
//DOM

const filterbar = document.getElementById("filterbar");
const filterButton = document.getElementById("filter__button");

const wrapper = document.getElementById('prod__container');
const searchbar = document.querySelector('#searchbar');
const categoryButtons = document.querySelectorAll('.category__button');
const prodTitle = document.querySelector('#prod__title');
const cartNumber = document.querySelector('#cart-number');
const prodLoad = document.querySelector('#products__download');

//Storage
const cartProductsStorage = JSON.parse(localStorage.getItem("cart-products"));

//Variables & Arrays
let products;
let btnAdd;
let cartProducts = [];
let filterActive = true;

const searchedWords = [];
const resultProducts = [];


/********************************
            Functions
********************************/

//carga de productos
const loadProducts = (productsCategory) => {
    wrapper.innerHTML = "";

    productsCategory.forEach(element => {

        const div = document.createElement("div");
        div.classList.add("prod__item")

        div.innerHTML = `
			<img src="${element.url}" alt="${element.description}" class="prod__item--img">
			<div class="prod__item--description">
				<h3 class="prod__item--title">${element.description}</h3>
				<p class="prod__item--price">$${element.price}</p>
				<button class="prod__item--button" id="${element.id}">Agregar</button>
			</div>
		
        `
        wrapper.append(div);

    })

    loadAddBtns();
}

//asigno escucha de evento click a cada botón de agregar
const loadAddBtns = () => {

    btnAdd = document.querySelectorAll('.prod__item--button');
    
    btnAdd.forEach(btn => {
        btn.addEventListener('click', addToCart);
        btn.addEventListener('click', notification);

    })
}

//agrega el producto al carrito en localStorage
const addToCart = (e) => {

    let prodToAdd = products.find((element) => {
        return element.id == e.currentTarget.id;
    })

    if(cartProducts.some(prod => prod.id == prodToAdd.id)){
        let index = cartProducts.findIndex(product => product.id == prodToAdd.id);
        cartProducts[index].quantity++;
    }else{
        prodToAdd.quantity = 1;
        cartProducts.push(prodToAdd); 
    }

    loadNumberCart();
    
    localStorage.setItem('cart-products', JSON.stringify(cartProducts))

}

//actualiza el número de productos en carrito
const loadNumberCart = () => {
    let quantityCart = cartProducts.reduce((sum, element) => sum + element.quantity, 0);
    cartNumber.innerText = quantityCart;
}

//notificación de toastify al agregar productos
const notification = () => {

    Toastify({
        text: "PRODUCTO AGREGADO",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #d90429, #FF5454)",
          fontSize: '.7em',
          borderRadius: '2em',
        },
        offset: {
            x: '1rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
}

const searchProducts = (e) => {
    
    e.preventDefault()
    const duplicatedSearch = [];
    resultProducts.length = 0;
    searchedWords.length = 0;

    let words = document.querySelector('#searchbar__input').value;
    searchedWords.push(...words.split(' '));

    searchedWords.forEach((element)=>{
        let result = products.filter((prodItem) => {
            return prodItem.description.toLowerCase().includes(element);
        })

        duplicatedSearch.push(...result);

    })

    const filteredResult = duplicatedSearch.reduce((sum, element) => {
        if(!sum.find(prod => prod.description == element.description)) {
            sum.push(element);
        }
        return sum;
        }, 
    [])

    resultProducts.push(...filteredResult);

    loadProducts(resultProducts);

    categoryButtons.forEach(button => button.classList.remove("active__btn"))
    prodTitle.innerText = "Resultado de búsqueda";
    filterbar.style.top = "-500px";
    filterActive = true;
}

/********************************
            Events
********************************/
//Se traen datos del json que contiene los productos como si fuera una API externa.
fetch("../data-JSON/productos.json")
    .then(res => res.json())
    .then(json => {
        products = [...json]
    
        setTimeout(()=>{
            loadProducts(products)
            prodLoad.style.display = "none";
        },0);
    })

//Filter Bar
filterButton.addEventListener("click", openFilter = (e) => {
    e.preventDefault
  
  
    if(filterActive == true){
        filterbar.style.top = "50px";
        filterActive = false;
    }else{
        filterbar.style.top = "-500px";
        filterActive = true;
    }
  
})

//Load Products: Simulación de tiempo de espera de carga de productos que se cargan con fetch.

categoryButtons.forEach( button => {

    button.addEventListener("click", (e) => {

        categoryButtons.forEach(button => button.classList.remove("active__btn"))

        e.currentTarget.classList.add("active__btn");

        const choosenCategory = products.filter(prod => prod.category == e.currentTarget.id)
        
        prodTitle.innerText = e.currentTarget.textContent;
        
        (e.currentTarget.id == "all") ? loadProducts(products) : loadProducts(choosenCategory);

        filterbar.style.top = "-500px";
        filterActive = true;

    })
    
})

if(cartProductsStorage) {
    cartProducts = [...cartProductsStorage];
    loadNumberCart();
}

searchbar.addEventListener('submit', searchProducts);
