/********************************
            Variables
********************************/
//DOM
let cartNumber = document.querySelector('#cart-number');
let productsContainer = document.querySelector('#cart__prod--container'); 
let textCartEmpty = document.querySelector('#text-cart-empty');
let textCartBougth = document.querySelector('#text__cart--bougth')
let actionsContainer = document.querySelector('#cart__actions--container');
let buttonEmpty = document.querySelector('#cart__empty--btn');
let buttonBuy = document.querySelector('#cart-buy-btn');
let totalPrice = document.querySelector('#cart-total-price');

//Storage
const cartProductsStorage = JSON.parse(localStorage.getItem("cart-products"));

//Variables & Arrays
let buttonsDelete;
let subTotalPrice = 0;

/********************************
            Functions
********************************/
const loadProducts = () => {
    if(cartProductsStorage && cartProductsStorage.length > 0) {
        
        productsContainer.innerHTML = "";
        textCartEmpty.classList.add('disable');
        actionsContainer.classList.remove('disable');
        textCartBougth.classList.add('disable');
        productsContainer.classList.remove('disable');
        
        cartProductsStorage.forEach(element => {
            
            const div = document.createElement('div');
            div.classList.add('cart__prod--item');
            
            div.innerHTML = `
                <img src="${element.url}" alt="${element.description}" class="cart__prod--img">
                <div class="cart__prod--title--wrapper">
                    <h5 class="cart__prod--title">Nombre</h5>
                    <h3 class="cart__prod--text">${element.description}</h3>
                </div>
                <div class="cart__prod--cant-wrapper">
                    <h5 class="cart__prod--title">Cantidad</h5>
                    <h3 class="cart__prod--text">${element.quantity}</h3>
                </div>
                <div class="cart__prod--price-wrapper">
                    <h5 class="cart__prod--title">Precio</h5>
                    <h3 class="cart__prod--text">$${element.price}</h3>
                </div>
                <div class="cart__prod--subt-wrapper">
                    <h5 class="cart__prod--title">Subtotal</h5>
                    <h3 class="cart__prod--text">$${element.price*element.quantity}</h3>
                </div>
                <button class="cart__prod--delete-btn" id="${element.id}"><i class="bi bi-trash delete-button"></i></button>
            `
            productsContainer.append(div);
        })
    
        loadDeleteBtns();
        sumTotal();
    
    }else {
        textCartEmpty.classList.remove('disable');
        actionsContainer.classList.add('disable');
        productsContainer.classList.add('disable');
    }

}

const loadDeleteBtns = () => {

    buttonsDelete = document.querySelectorAll('.cart__prod--delete-btn');
    
    buttonsDelete.forEach(btn => {
        btn.addEventListener('click', deleteElement);
    })
}

const deleteElement = (e) => {

    let indexDelete = cartProductsStorage.findIndex((element) => element.id == e.currentTarget.id)

    cartProductsStorage.splice(indexDelete, 1)

    localStorage.setItem('cart-products', JSON.stringify(cartProductsStorage));

    loadProducts();
    
}

const sumTotal = () => {

    subTotalPrice = 0;
    cartProductsStorage.forEach(element => {
        subTotalPrice += element.price*element.quantity;
    })

    totalPrice.innerText = `$${subTotalPrice}`;

}

const emptyCart = (e) => {
    cartProductsStorage.length = 0;

    localStorage.setItem('cart-products', JSON.stringify(cartProductsStorage));
    loadProducts();
}

const buyCart = (e) => {
    cartProductsStorage.length = 0;

    localStorage.setItem('cart-products', JSON.stringify(cartProductsStorage));

    textCartEmpty.classList.add('disable');
    actionsContainer.classList.add('disable');
    textCartBougth.classList.remove('disable');
    productsContainer.classList.add('disable');
}

/********************************
            Events
********************************/
loadProducts();

buttonEmpty.addEventListener('click', emptyCart);
buttonBuy.addEventListener('click', buyCart);