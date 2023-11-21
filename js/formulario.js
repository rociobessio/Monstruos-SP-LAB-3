import Monstruo from "./Monstruo.js";

export function miFormulario(form){
    const defensa = form.querySelector('input[name="defensa"]:checked').value;
    const monstruo = new Monstruo(
        form.txtId.value,
        form.txtNombre.value,
        form.rangeFuerza.value,
        form.txtAlias.value,
        defensa,
        form.rangeMiedo.value,
        form.tipo.value
    );
    return monstruo;
}

/**
 * Me va a permitir actualizar la informacion
 * del formulario con la informacion de un monstruo.
 * @param {*} input 
 * @param {*} entidad 
 */
export function actualizarForm(input, entidad) { 

    if (entidad) {//-->Que no entre si es undefined
        input.txtId.value = entidad.id;
        input.txtNombre.value = entidad.nombre;
        input.rangeFuerza.value = entidad.fuerza;
        input.txtAlias.value = entidad.alias;
        input.rangeMiedo.value = entidad.miedo;
        input.tipo.value = entidad.tipo;

        const defensaRadios = input.querySelectorAll('input[name="defensa"]'); 
        defensaRadios.forEach(radio => { 
            radio.checked = radio.value === entidad.defensa;
        });
    }
}

/**
 * Me permitira mostrar dinamicamente
 * los tipos de monstruos disponibles.
 * 
 * CONSIGNA:
 * Cuyas opciones son Todos/Vampiro/Hombre
 * Lobo/Fantasma/Esqueleto/Bruja/Zombie. Por defecto debe ser todos
 * @param {*} lista la lista de tipos
 * @param {*} contenedor donde voy a imprimir los tipos
 * @param {boolean} todos si tengo que imprimir la opcion
 * TODOS o no.
 */
export function cargarTipoMonstruos(lista,contenedor,todos){

    //-->Si todos es true agrega al contedor la opcion todos.
    if (todos) {
        lista.unshift("Todos");
    }

    // let input = document.getElementById("IDTipo");
    lista.forEach(element => {
        const tipo = document.createElement('option');
        contenedor.appendChild(tipo);
        tipo.value = element;
        tipo.textContent = element;
    });
}

/**
 * Me permitira mostrar un mensaje de alert
 * personalizado.
 * @param {*} contenedor 
 * @param {*} mensaje 
 */
export function mostrarAlerta(contenedor, mensaje) {
    const alertElement = contenedor;
    const mensajeContenedor = alertElement.querySelector('#mensajeAlerta');
    if (alertElement && mensajeContenedor) {
        mensajeContenedor.textContent = mensaje;
        alertElement.classList.remove('hide');
    }
    
}



/**
 * Servira para mostrar algunos controles y 
 * ocultarlos, dependera de la condicion
 * @param {*} condition 
 */
export function hideUnhideButtonsYLabel(condition){
    if(condition){
        document.querySelector('#idFormulario').value = '';
        document.querySelector('#btnEnviar').classList.remove('hidden');
        document.querySelector('#btnModificar').classList.add('hidden');
        document.querySelector('#btnEliminar').classList.add('hidden');
        // document.querySelector('#lblMonstruos').classList.remove('hidden');
    } else {
        document.querySelector('#btnEnviar').classList.add('hidden');
        document.querySelector('#btnModificar').classList.remove('hidden');
        document.querySelector('#btnEliminar').classList.remove('hidden');
        document.querySelector('#lblMonstruos').classList.add('hidden');
    }
}