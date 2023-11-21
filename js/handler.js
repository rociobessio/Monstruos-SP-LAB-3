import Monstruo from "./Monstruo.js";
import {obtenerLocalStorage,setLocalStorage} from "./localStorage.js";

export function crearEntidad(nuevaEntidad) {
    console.log("Creando entidad:", nuevaEntidad);

    let entidades = obtenerLocalStorage(Monstruo.getMainKey()) || [];

    if (!entidades.length) {
        nuevaEntidad.id = 1;
    } else {
        nuevaEntidad.id = entidades[entidades.length - 1].id + 1;
    }

    entidades.push(nuevaEntidad);
    setLocalStorage(Monstruo.getMainKey(), entidades);
    console.log("Entidad creada y almacenada:", nuevaEntidad);
    alert('Monstruo creado correctamente!');
    document.getElementById('tablaDinamica').scrollIntoView({ behavior: "smooth", block: "start" });
}

export function eliminarEntidad(id) {
    let entidades = obtenerLocalStorage(Monstruo.getMainKey());
    let index = entidades.findIndex((ent) => ent.id == id);

    if (index !== -1) {
        entidades.splice(index, 1);
        setLocalStorage(Monstruo.getMainKey(), entidades);
        alert('Se eliminó el monstruo correctamente!');
    } else {
        alert('No se pudo encontrar el monstruo para eliminar.');
    }
}

export function updateEntidad(entidad) {
    let entidades = obtenerLocalStorage(Monstruo.getMainKey());

    // Utiliza el ID de la entidad para encontrarla y actualizarla.
    let index = entidades.findIndex((ent) => ent.id == entidad.id);

    if (index !== -1) {
        entidades[index] = entidad;
        setLocalStorage(Monstruo.getMainKey(), entidades);
        alert('Se modifico el monstruo con éxito!');

    } else {
        alert('No se pudo encontrar el monstruo para modificar.');
    }
}