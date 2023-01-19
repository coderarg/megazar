/********************************
            Variables
********************************/
//DOM

let filterbar = document.getElementById("filterbar");
let filterButton = document.getElementById("filter__button");

let wrapper = document.getElementById('prod__container');
let categoryButtons = document.querySelectorAll('.category__button');
let prodTitle = document.querySelector('#prod__title');
let cartNumber = document.querySelector('#cart-number');

//Storage
const cartProductsStorage = JSON.parse(localStorage.getItem("cart-products"));

//Variables & Arrays
let products;
let btnAdd;
let cartProducts = [];
let filterActive = true;


/********************************
            Functions
********************************/

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

const loadAddBtns = () => {

    btnAdd = document.querySelectorAll('.prod__item--button');
    
    btnAdd.forEach(btn => {
        btn.addEventListener('click', addToCart);
        btn.addEventListener('click', notification);

    })
}


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


const loadNumberCart = () => {
    let quantityCart = cartProducts.reduce((sum, element) => sum + element.quantity, 0);
    cartNumber.innerText = quantityCart;
}

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


/********************************
            Events
********************************/
//Se traen datos del json que contiene los productos como si fuera una API externa.
fetch("../data-JSON/productos.json")
    .then(res => res.json())
    .then(json => {
        products = [...json]
        setTimeout(()=>{

        },500)
        setTimeout(()=>loadProducts(products),500);
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



/*  
//BUSCADOR
//Creo arrays para palabras buscadas y resultado
const palabrasBuscadas = [];
const resultado = [];

//Pido los productos buscados y los guardo en un array
//Como esto da duplicados cuando buscamos palabras que coincidan en un mismo producto (como: la el de del a para más. etc ) o si se escriben 2 veces el mismo producto, aplico reduce para borrar duplicados

const pedirProductos = () => {

    let productosBuscados = prompt("Ingresar Producto a Buscar").toLowerCase();
    palabrasBuscadas.push(...productosBuscados.split(' '));
    
}

//Busco cada palabra buscada en el array de productos. Si la palabra se encuentra en la descripción entonces lo agrego (push) al resultado de búsqueda.
const buscarPalabras = () => {
    
    palabrasBuscadas.forEach((palabra)=>{
        let resultadoParcial = products.filter((prodItem) => {
            return prodItem.description.toLowerCase().includes(palabra);
        })
        resultado.push(...resultadoParcial);
    }) 
}

//ORDEN DE PRODUCTOS POR PRECIO

//Hago Backup de productos, ya que sort es un prosedimiento destructivo.

let order;
const productsBackup = [];
productsBackup.push(...products);
console.table(productsBackup); //Muestro los productos por default.

//Función para pedir asc o desc
const ascOrDesc = () => {
    
    order = prompt(`Ingrese "asc" para orden ascendente o "desc" para orden descendente`).toLowerCase();

}

//Función que apartir del dato order ordena asc o desc. En caso que se ingrese mal la orden consulta si quiere volver a intentarlo y llama a las funciones.


const sortProducts = (order) => {

    if(order == "asc"){
        productsBackup.sort((a, b) => {
            if(a.price > b.price){
                return 1;
            }
            if(a.price < b.price){
                return -1;
            }
            
            return 0;
            
        })
    }else if(order == "desc") {
        productsBackup.sort((a, b) => {
            if(a.price > b.price){
                return -1;
            }
            if(a.price < b.price){
                return 1;
            }
            
            return 0;
        })
    }else{
        let qa = confirm("¿Ingresó un valor equivocado, desea volver a intentarlo?");

        if(qa){
            ascOrDesc();
            sortProducts(order);
        }else{
            console.log(productsBackup)
        }
    }

}


//Consulto la operación que quiere realizar el usuario
let option = prompt(`Si desea ordenar ingrese "ordenar", si desea buscar productos ingrese "buscar"`, "");

//Según la opción ejecto las funciones de búsqueda u orden.
// En un futuro cada función se aplica al addEventListener de submit para buscador o input.value del option asc o desc (como en mercado libre).

switch(option){
    case "ordenar":
        ascOrDesc();
        sortProducts(order);
        console.table(productsBackup);
        break;
    
    case "buscar":
        pedirProductos();
        console.log("Las palabras buscadas son ", palabrasBuscadas);
        buscarPalabras();
        console.log("El resultado de búsqueda con duplicados es:")
        console.table(resultado);
        // Como esto puede dar duplicados cuando se ingresan dos palabras iguales, o que un producto contenga dos palabras buscadas.
        const resultadoFiltrado = resultado.reduce((acumulador, element) => {
        if(!acumulador.find(dato => dato.description == element.description)) {
            acumulador.push(element);
        }
        return acumulador;
        }, [])
        console.log("El resultado de búsqueda final es:")
        console.table(resultadoFiltrado);
        break;

    default:
        alert("lo sentimos, se ah producido un error")
        break
} */