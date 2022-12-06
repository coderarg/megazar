let catTools = "Herramientas";
let catKitchen = "Cocina";
let catPlates = "Vajilla";
let catDeco = "Decoración";

const productos = [
    {id:1, descripcion: "Lupa Plegable Luz 10 Led Manicura Pedicura Multifunción", categoria: catTools, precio: 6762, stock: 0},
    {id:2, descripcion: "Pack 6 Velas Led Con Llama Con Movimiento Realistas", categoria: catDeco, precio: 5384, stock: 2},
    {id:3, descripcion: "Set 10 Bowls Cocina Acero Inoxidable Ensaladera 21 Cm", categoria: catKitchen, precio: 3864, stock: 1},
    {id:4, descripcion: "Cuchillo Hacha Hachuela Carnicero Chef Estilo Asiático", categoria: catKitchen, precio: 2800, stock: 2},
    {id:5, descripcion: "Plato Rectangular Curvo Diseño Bandeja Picada Cerámica", categoria: catPlates, precio: 3230, stock: 4},
    {id:6, descripcion: "Set 6 Bandeja Rectangular Heladera Pollería Carnicería", categoria: catKitchen, precio: 4846, stock: 3},
    {id:7, descripcion: "Tijera Para Peluquería Canina Esquilar Ovejas Animales", categoria: catTools, precio: 3230, stock: 4},
    {id:8, descripcion: "Set Cuchillos Acero Inoxidable con Pela Papa Cerámico Marmolado", categoria: catKitchen, precio: 3938, stock: 2}
]

let busqueda = prompt("Ingresar Producto a Buscar").toLowerCase();

const resultado = productos.filter((el) => el.descripcion.toLowerCase().includes(busqueda));

console.log(resultado);