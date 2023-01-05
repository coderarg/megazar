/********************************
     3er Preentrega Proyecto
********************************/

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

  //en el caso que haya datos en el sessionStorage vamos a recuperarlos y a pushearlos al array de contactos para luego guardar todas las entradas.
  //esto me permite hacer una "base de datos" en el sessionStorage

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

  //esto es simplemente para mostrar los datos en consola
  let contactosRecuperados = JSON.parse(sessionStorage.getItem('contactos'));
  console.log("Datos recuperados del SessionStorage", contactosRecuperados);

}

/********************************
            Eventos
********************************/

//El concepto es armar una base de datos en el sessionStorage de todas las peticiones de contacto. Cuando tenga acceso a librerías agregaré un "cartelito emergente" que avise que se envió exitosamente.

submitButtonInput.addEventListener('click', (e) => {
  
  e.preventDefault();
  tomarDatos();

  cargaSessionStorage();
  descargaSessionStorage();

  //Cuando termina de tomar los valores, sumarlos al Array contactos, recargo la página para que el js se recargue y no vuelva a guardar los datos precargados. También podría solucionarse borrando los datos del array pero me pareció menos código.
  location.reload();

});

