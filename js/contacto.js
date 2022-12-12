/********************************
     2da Preentrega Proyecto
********************************/

//Entradas por prompt, salidas por alert o console.log
//Objetos
//Arrays
//Funciones: forEach - find - filter - some - map - reduce - sort - split (string to array)

//Declaro variables locales
let fullName;
let emailChar;
let phoneNumber;
let categoryName;
let question;

//Consultas que se ingresan en los prompt() del formulario
let consultaFullName = "Ingrese su Nombre Completo";
let consultaEmail = "Ingrese su Email";
let consultaPhoneNumber = "Ingrese su Número de Teléfono";
let consultaCategoryName = "Ingrese la categoría";
let consultaQuestion = "Ingrese su mensaje aquí...";

//Array Donde guardaré todos los contactos
const contactos = [];

//Creo la clase de Contacto
class Contacto {
  constructor(name, email, phone, category, message) {
    this.name = name,
    this.email = email,
    this.phone = phone,
    this.category = category,
    this.message = message
  }

}

//función tomar datos dependiendo del mensaje pasado
const saveData = mensaje => { 
  let userData = ""; //creo una variable local en la función

  //verifica que mensaje está ingresando, y "valida" datos del formulario según corresponda
  //Luego uso bucle do...while para solicitar dato hasta que sea correcto.
  
  switch (mensaje){
    case consultaFullName:
      do{
        userData = prompt(`${mensaje}`).toLowerCase();
      }while(userData == "")
      break;
    
    case consultaEmail:
      do{
        userData = prompt(`${mensaje}`).toLowerCase().trim(); //paso a minúsculas y saco espacios.
      }while(userData == " " && !userData.includes("@"))
      break;
    
    case consultaPhoneNumber:
      do{
        userData = prompt(`${mensaje}`).trim();
      }while(userData <= 10000000) //valido si es un número de más de 8 dígidos
      break;
    
    case consultaCategoryName:
      do {
        userData = prompt(`${mensaje}`).toLowerCase();
      }while(userData == " ")
      break;

    case consultaQuestion:
      do{
        userData = prompt(`${mensaje}`);
      }while(userData == " " && userData == " ")
      break;
  }

  return userData

}

let pidoDatos = window.confirm("¿Quiere dejar una consulta?");

if(pidoDatos) {
  
  fullName = saveData(consultaFullName);
  
  emailChar = saveData(consultaEmail);
  
  phoneNumber = saveData(consultaPhoneNumber);
  
  categoryName = saveData(consultaCategoryName);
  
  question = saveData(consultaQuestion);

  //Guardo información de clase de contacto y la pusheo a un array de todos los contactos
  contactos.push(new Contacto(fullName, emailChar, phoneNumber, categoryName, question));

  alert("Su consulta ha sido ingresada exitosamente, en breves le responderemos.")
} else {
  alert("Estamos a disposición por cualquier consulta!")
}


//Dejo el console.log para mostrar
console.log(contactos);
