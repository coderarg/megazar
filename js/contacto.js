/********************************
     3er Preentrega Proyecto
********************************/

/********************************
      Entidades y Clases
********************************/
//Creo la clase de Contacto
class Contacto {
  constructor(fname, email, phone, category, message, formOK) {
    this.fname = fname,
    this.email = email,
    this.phone = phone,
    this.category = category,
    this.message = message,
    this.formOK = formOK
  }
};

/********************************
            Variables
********************************/

//Declaro variables locales
let fullName = document.querySelector('#fullName');
let emailChar = document.querySelector('#email');
let phoneNumber = document.querySelector('#phone');
let categoryName = document.querySelector('#category');
let question = document.querySelector('#question');
let formOK = document.querySelector('#form-ok')

//Array Donde guardaré todos los contactos
const contactos = [];
//
/********************************
            Funciones
********************************/


//Eventos
/********************************
            Eventos
********************************/

