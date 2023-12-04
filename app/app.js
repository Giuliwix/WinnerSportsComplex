// Función para validar el formulario
function validarFormulario() {
    // Obtén los valores de los campos del formulario
    var nombre = document.getElementById("nombre-afiliado").value;
    var email = document.getElementById("email-afiliado").value;
    var contrasena = document.getElementById("contrasena").value;

    // Expresión regular para validar el formato del correo electrónico
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // Almacena los mensajes de error en un array
    var errores = [];

    // Verifica que el nombre no esté vacío
    if (nombre === "" || nombre.length < 2) {
        errores.push("Por favor, ingresa tu nombre.");
    }

    // Verifica que el correo electrónico sea válido
    if (!emailRegex.test(email)) {
        errores.push("Por favor, ingresa un correo electrónico válido.");
    }

    // Verifica que la contraseña tenga máximo 8 caracteres y no contenga símbolos
    if (contrasena.length < 1 || contrasena.length > 8 || /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(contrasena)) {
        errores.push("Por favor, ingresa una contraseña válida.");
    }

    // Si hay errores, muestra todos los mensajes de error
    if (errores.length > 0) {
        mostrarMensajes(errores, false);
        return false; // Evitar la recarga de la página
    }

    // Si todos los campos son válidos, muestra un mensaje de éxito
    mostrarMensajes(["¡Registro exitoso!"], true);
    document.getElementById("nombre-afiliado").value = "";
    document.getElementById("email-afiliado").value = "";
    document.getElementById("contrasena").value = "";
    return false; // Evitar la recarga de la página
}

// Función para mostrar mensajes de error o éxito
function mostrarMensajes(mensajes, esExitoso) {
    let mensajeElement = document.querySelector(".warnings");
    mensajeElement.innerHTML = "";

    let color = esExitoso ? "green" : "red";

    for (let i = 0; i < mensajes.length; i++) {
        let mensaje = document.createElement("p");
        mensaje.textContent = mensajes[i];
        mensaje.style.color = color;
        mensajeElement.appendChild(mensaje);
    }
}

// Agrega un event listener al botón "Registrarse" para validar el formulario
document.addEventListener("DOMContentLoaded", function() {
    var btnRegistrarse = document.getElementById("btn-registrarse");
    btnRegistrarse.addEventListener("click", validarFormulario);
});


// Función para crear una reserva
function crearReserva() {
    const formData = new FormData(document.getElementById('crearReservaForm'));

    fetch('/api/crear_reserva/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reserva creada exitosamente.');
        } else {
            alert('Error al crear la reserva.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Función para listar las reservas
function listarReservas() {
    const nombreUsuario = 'nombre_usuario';  // Puedes obtener este valor dinámicamente

    fetch(`/api/listar_reservas/?nombre_usuario=${nombreUsuario}`)
    .then(response => response.json())
    .then(data => {
        const listaReservas = document.getElementById('listaReservas');
        listaReservas.innerHTML = '';

        if (data.reservas) {
            data.reservas.forEach(reserva => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${reserva.id}, Instalación: ${reserva.instalacion}, Clase: ${reserva.clase}, Fecha: ${reserva.fecha}, Hora: ${reserva.hora}`;
                listaReservas.appendChild(listItem);
            });
        } else {
            alert('Error al obtener la lista de reservas.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Llama a la función listarReservas al cargar la página
document.addEventListener('DOMContentLoaded', listarReservas);

function cancelarReserva() {
    const idReserva = document.getElementById('idReserva').value;
 
    fetch(`/api/cancelar_reserva/?id_reserva=${idReserva}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reserva cancelada exitosamente.');
        } else {
            alert('Error al cancelar la reserva.');
        }
    })
    .catch(error => console.error('Error:', error));
 }