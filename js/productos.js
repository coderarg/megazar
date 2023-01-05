/********************************
     3er Preentrega Proyecto
********************************/

/********************************
            Variables
********************************/
const products = [
    {
        id: 1,
        descripcion: "Lupa Plegable Luz 10 Led Manicura Pedicura Multifunción",
        categoria: "herramientas",
        precio: 6199,
        stock: 0,
        url: "../sources\images\categoria-herramientas\lupa-plegable-luzled\lupa-plegable-led-1.png"
    },
    {
        id: 2,
        descripcion: "Pack 6 Velas Led Con Llama Con Movimiento Realistas",
        categoria: "decoracion",
        precio: 6300,
        stock: 3,
        url: "../sources\images\categoria-decoracion\velas-led-movimiento\velas-led-movimiento-4.png"
    },
    {
        id: 3,
        descripcion: "Set 10 Bowls Cocina Acero Inoxidable Ensaladera 21 Cm",
        categoria: "cocina",
        precio: 4569,
        stock: 3,
        url: "../sources\images\categoria-cocina\bowls-acero-inoxidable\bowl-acero-inoxidable-2.png"
    },
    {
        id: 4,
        descripcion: "Cuchillo Hacha Hachuela Carnicero Chef Estilo Asiático",
        categoria: "cocina",
        precio: 3309,
        stock: 3,
        url: "../sources\images\categoria-cocina\cuchillo-hacha\cuchillo-hacha-hachuela-1.png"
    },
    {
        id: 5,
        descripcion: "Plato Rectangular Curvo Diseño Bandeja Picada Cerámica",
        categoria: "vajilla",
        precio: 3820,
        stock: 4,
        url: "../sources\images\categoria-vajilla\plato-rectangular-bandeja\plato-rectangular-bandeja-2.png"
    },
    {
        id: 6,
        descripcion: "Set 6 Bandeja Rectangular Heladera Pollería Carnicería",
        categoria: "cocina",
        precio: 5727,
        stock: 3,
        url: "../sources\images\categoria-cocina\bandeja-rectangular-carniceria\bandeja-rectangular-carniceria-1.png"
    },
    {
        id: 7,
        descripcion: "Tijera Para Peluquería Canina Esquilar Ovejas Animales",
        categoria: "herramientas",
        precio: 4655,
        stock: 4,
        url: "../sources\images\categoria-herramientas\tijeras-esquilar\tijera-esquilar-1.png"
    },
    {
        id: 8,
        descripcion: "Set Cuchillos Acero Inoxidable con Pela Papa Cerámico Marmolado",
        categoria: "cocina",
        precio: 3938,
        stock: 3,
        url: "../sources\images\categoria-cocina\set-cuchillos-pelapapa\set-cuchillos-pelapapa-1.png"
    },
    {
        id: 9,
        descripcion: "Set 100 Luces Led Lluvia Navidad Guirnalda Navideña A Pila", categoria: "decoracion",
        precio: 2037,
        stock: 0,
        url: "../sources\images\categoria-decoracion\luces-navidad-lluvia\luces-navidad-lluvia-1.png"
    },
    {
        id: 10,
        descripcion: "100 Luces Arroz Navidad Led Guirnalda X2 unidades",
        categoria: "decoracion",
        precio: 2000,
        stock: 3,
        url: "../sources\images\categoria-decoracion\luces-navidad-100-calidas\luces-navidad-100-calidas-1.png"
    },
    {
        id: 11,
        descripcion: "Seca Limpia Vidrios Rasqueta Plástica Mango Corto",
        categoria: "herramientas",
        precio: 1299,
        stock: 5,
        url: "../sources\images\categoria-herramientas\limpia-vidrios\limpia-vidrios-rasqueta-2.png"
    },
    {
        id: 12,
        descripcion: "Chuchillo Navaja Mariposa Practica Sin Filo Tornasol",
        categoria: "deportes",
        precio: 3165,
        stock: 5,
        url: "../sources\images\categoria-deportes\navaja-tornasol-practica\navaja-tornasol-practica.png"
    },
    {
        id: 13,
        descripcion: "Cafetera Prensa Francesa de Embolo Vidrio y Acero Inoxidable",
        categoria: "cocina",
        precio: 1936,
        stock: 4,
        url: "../sources\images\categoria-cocina\prensa-francesa\prensa-francesa-2.png"
    },
    {
        id: 14,
        descripcion: "Cafetera Italiana Moka Expresso 3 Pocillos Aluminio Pulida",
        categoria: "cocina",
        precio: 7635,
        stock: 4,
        url: "../sources\images\categoria-cocina\cafetera-italiana\cafetera-italiana-2.png"
    },
]



/********************************
            Funciones
********************************/



/********************************
            Eventos
********************************/

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
            return prodItem.descripcion.toLowerCase().includes(palabra);
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
            if(a.precio > b.precio){
                return 1;
            }
            if(a.precio < b.precio){
                return -1;
            }
            
            return 0;
            
        })
    }else if(order == "desc") {
        productsBackup.sort((a, b) => {
            if(a.precio > b.precio){
                return -1;
            }
            if(a.precio < b.precio){
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
        const resultadoFiltrado = resultado.reduce((acumulador, elemento) => {
        if(!acumulador.find(dato => dato.descripcion == elemento.descripcion)) {
            acumulador.push(elemento);
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