/********************************
            Clases
********************************/
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

//DOM

const $form = document.querySelector("#form");


/********************************
            Funciones
********************************/

async function handleSubmit(e) {

    e.preventDefault();

    const formData = new FormData($form);

    const response = await fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok) {
        mensaje();
    }
}

const mensaje = () => {
    Swal.fire(
        'Gracias!',
        'Tus datos se han enviado correctamente'
    )
}


/********************************
            Eventos
********************************/

$form.addEventListener('submit', handleSubmit);


