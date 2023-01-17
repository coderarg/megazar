/********************************
            Clases
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

//Declaro variables globales
let submitButtonInput = document.getElementById('form__submit');

//Array Donde guardaré todos los contactos
const contactos = [];


/********************************
            Funciones
********************************/

const tomarDatos = () => {

  let fullNameInput = document.getElementById('fullName').value;
  let emailInput = document.getElementById('email').value;
  let phoneInput = document.getElementById('phone').value;
  let categoryInput = document.getElementById('category').value;
  let questionInput = document.getElementById('question').value;
  let checkTermsInput = document.getElementById('form-ok').value;
    
  const newContacto = new Contacto(fullNameInput, emailInput, phoneInput, categoryInput, questionInput, checkTermsInput, submitButtonInput);

  contactos.push(newContacto);

}



const cargaSessionStorage = () => {

  let recuperoParcial;
  recuperoParcial = JSON.parse(sessionStorage.getItem('contactos'));

  if(recuperoParcial) {
    for(contacto of recuperoParcial) {
      
      contactos.push(contacto);
    }
  }

  sessionStorage.setItem('contactos', JSON.stringify(contactos));

}

const descargaSessionStorage = () => {

  let contactosRecuperados = JSON.parse(sessionStorage.getItem('contactos'));

}

/********************************
            Eventos
********************************/

submitButtonInput.addEventListener('click', (e) => {
  
  e.preventDefault();

  tomarDatos();

  cargaSessionStorage();
  descargaSessionStorage();


  Swal.fire(
    'Gracias!',
    'Tus datos se han enviado correctamente'
  )

});

