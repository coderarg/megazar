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

//cargar productos
const loadProducts = () => {

    //si LS existe y si length>0
    if(cartProductsStorage && cartProductsStorage.length > 0) {
        //vaciar el carrito
        productsContainer.innerHTML = "";
        textCartEmpty.classList.add('disable');
        actionsContainer.classList.remove('disable');
        textCartBougth.classList.add('disable');
        productsContainer.classList.remove('disable');
        
        //mostrar productos de L.S.
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
       loadNumberCart();
    //si no hay productos en local storage: carrito vacío
    }else {
        textCartEmpty.classList.remove('disable');
        actionsContainer.classList.add('disable');
        productsContainer.classList.add('disable');
    }

}

//cargar eventos los botones de borrar
const loadDeleteBtns = () => {

    buttonsDelete = document.querySelectorAll('.cart__prod--delete-btn');
    
    buttonsDelete.forEach(btn => {
        btn.addEventListener('click', deleteElement);
    })
}

//función que borra el producto de LS y DOM
const deleteElement = (e) => {

    notification();
    let indexDelete = cartProductsStorage.findIndex((element) => element.id == e.currentTarget.id)

    cartProductsStorage.splice(indexDelete, 1)

    localStorage.setItem('cart-products', JSON.stringify(cartProductsStorage));

    //cargo productos para "actualizar"
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
    loadNumberCart();
}

//función comprar carrito (ficticia) hace casi lo mismo que 
const buyCart = (e) => {
    cartProductsStorage.length = 0;

    localStorage.setItem('cart-products', JSON.stringify(cartProductsStorage));

    
    textCartEmpty.classList.add('disable');
    actionsContainer.classList.add('disable');
    productsContainer.classList.add('disable');

}

const loadNumberCart = () => {
    let quantityCart = cartProductsStorage.reduce((sum, element) => sum + element.quantity, 0);
    cartNumber.innerText = quantityCart;
}

const notification = () => {

    Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #d90429, #FF5454)",
          fontSize: '.7em',
          borderRadius: '2em',
        },
        offset: {
            x: '1rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
}

const notificationDeleteAll = () => {
     
Swal.fire({
    title: '<strong>¿Estás seguro?</strong>',
    icon: 'question',
    html:
      'Borrar todos los productos del carrito',
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      'Borrar',
    cancelButtonText:
      'Cancelar',
    cancelButtonAriaLabel: 'Thumbs down'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        emptyCart();
    }
  })
}


/********************************
            Events
********************************/
loadProducts();

buttonEmpty.addEventListener('click', notificationDeleteAll);
buttonBuy.addEventListener('click', buyCart);