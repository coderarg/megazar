let catTools = "Herramientas";
let catKitchen = "Cocina";
let catPlates = "Vajilla";
let catDeco = "Decoración";

const products = [
    {id:1, descripcion: "Lupa Plegable Luz 10 Led Manicura Pedicura Multifunción", categoria: catTools, precio: 6762, stock: 0},
    {id:2, descripcion: "Pack 6 Velas Led Con Llama Con Movimiento Realistas", categoria: catDeco, precio: 5384, stock: 2},
    {id:3, descripcion: "Set 10 Bowls Cocina Acero Inoxidable Ensaladera 21 Cm", categoria: catKitchen, precio: 3864, stock: 1},
    {id:4, descripcion: "Cuchillo Hacha Hachuela Carnicero Chef Estilo Asiático", categoria: catKitchen, precio: 2800, stock: 2},
    {id:5, descripcion: "Plato Rectangular Curvo Diseño Bandeja Picada Cerámica", categoria: catPlates, precio: 3230, stock: 4},
    {id:6, descripcion: "Set 6 Bandeja Rectangular Heladera Pollería Carnicería", categoria: catKitchen, precio: 4846, stock: 3},
    {id:7, descripcion: "Tijera Para Peluquería Canina Esquilar Ovejas Animales", categoria: catTools, precio: 3230, stock: 4},
    {id:8, descripcion: "Set Cuchillos Acero Inoxidable con Pela Papa Cerámico Marmolado", categoria: catKitchen, precio: 3938, stock: 2}
]

 
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
}