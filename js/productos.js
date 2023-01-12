/********************************
            Variables
********************************/
const products = [
    {
        id: "product__1",
        description: "Lupa Plegable Luz 10 Led Manicura Pedicura Multifunción",
        category: "tools",
        price: 6199,
        stock: 0,
        url:"../sources/images/categoria-herramientas/lupa-plegable-luzled/lupa-plegable-led-1.png",
        quantity: 1
    },
    {
        id: "product__2",
        description: "Pack 6 Velas Led Con Llama Con Movimiento Realistas",
        category: "decoration",
        price: 6300,
        stock: 3,
        url: "../sources/images/categoria-decoracion/velas-led-movimiento/velas-led-movimiento-4.png",
        quantity: 1
    },
    {
        id: "product__3",
        description: "Set 10 Bowls Cocina Acero Inoxidable Ensaladera 21 Cm",
        category: "kitchen",
        price: 4569,
        stock: 3,
        url: "../sources/images/categoria-cocina/bowls-acero-inoxidable/bowl-acero-inoxidable-2.png",
        quantity: 1
    },
    {
        id: "product__4",
        description: "Cuchillo Hacha Hachuela Carnicero Chef Estilo Asiático",
        category: "kitchen",
        price: 3309,
        stock: 3,
        url: "../sources/images/categoria-cocina/cuchillo-hacha/cuchillo-hacha-hachuela-1.png",
        quantity: 1
    },
    {
        id: "product__5",
        description: "Plato Rectangular Curvo Diseño Bandeja Picada Cerámica",
        category: "crockery",
        price: 3820,
        stock: 4,
        url: "../sources/images/categoria-vajilla/plato-rectangular-bandeja/plato-rectangular-bandeja-2.png",
        quantity: 1
    },
    {
        id: "product__6",
        description: "Set 6 Bandeja Rectangular Heladera Pollería Carnicería",
        category: "kitchen",
        price: 5727,
        stock: 3,
        url: "../sources/images/categoria-cocina/bandeja-rectangular-carniceria/bandeja-rectangular-carniceria-1.png",
        quantity: 1
    },
    {
        id: "product__7",
        description: "Tijera Para Peluquería Canina Esquilar Ovejas Animales",
        category: "tools",
        price: 4655,
        stock: 4,
        url: "../sources/images/categoria-herramientas/tijeras-esquilar/tijera-esquilar-1.png",
        quantity: 1
    },
    {
        id: "product__8",
        description: "Set Cuchillos Acero Inoxidable con Pela Papa Cerámico Marmolado",
        category: "kitchen",
        price: 3938,
        stock: 3,
        url: "../sources/images/categoria-cocina/set-cuchillos-pelapapa/set-cuchillos-pelapapa-1.png",
        quantity: 1
    },
    {
        id: "product__9",
        description: "Set 100 Luces Led Lluvia Navidad Guirnalda Navideña A Pila", 
        category: "decoration",
        price: 2037,
        stock: 0,
        url: "../sources/images/categoria-decoracion/luces-navidad-lluvia/luces-navidad-lluvia-1.png",
        quantity: 1
    },
    {
        id: "product__10",
        description: "100 Luces Arroz Navidad Led Guirnalda X2 unidades",
        category: "decoration",
        price: 2000,
        stock: 3,
        url: "../sources/images/categoria-decoracion/luces-navidad-100-calidas/luces-navidad-100-calidas-1.png",
        quantity: 1
    },
    {
        id: "product__11",
        description: "Seca Limpia Vidrios Rasqueta Plástica Mango Corto",
        category: "tools",
        price: 1299,
        stock: 5,
        url: "../sources/images/categoria-herramientas/limpia-vidrios/limpia-vidrios-rasqueta-2.png",
        quantity: 1
    },
    {
        id: "product__12",
        description: "Chuchillo Navaja Mariposa Practica Sin Filo Tornasol",
        category: "sports",
        price: 3165,
        stock: 5,
        url: "../sources/images/categoria-deportes/navaja-tornasol-practica/navaja-tornasol-practica.png",
        quantity: 1
    },
    {
        id: "product__13",
        description: "Cafetera Prensa Francesa de Embolo Vidrio y Acero Inoxidable",
        category: "kitchen",
        price: 1936,
        stock: 4,
        url: "../sources/images/categoria-cocina/prensa-francesa/prensa-francesa-2.png",
        quantity: 1
    },
    {
        id: "product__14",
        description: "Cafetera Italiana Moka Expresso 3 Pocillos Aluminio Pulida",
        category: "kitchen",
        price: 7635,
        stock: 4,
        url: "../sources/images/categoria-cocina/cafetera-italiana/cafetera-italiana-2.png",
        quantity: 1
    },
]

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


/********************************
            Events
********************************/

//Filter Bar
filterButton.addEventListener("click", openFilter = (e) => {
    e.preventDefault
  
  
    if(filterActive == true)
    {filterbar.style.top = "50px";
      filterActive = false;
    }else{
      filterbar.style.top = "-500px";
      filterActive = true;
    }
  
})

//Load Products
loadProducts(products);

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

//ORDEN DE PRODUCTOS POR price

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