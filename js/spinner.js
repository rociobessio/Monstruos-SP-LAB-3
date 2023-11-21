export function girarSpinner(){
    const divSpinner = document.getElementById("spinner");
    const imagen = document.createElement("img");
    const tabla = document.getElementById("tablaDinamica");
    imagen.setAttribute("src", "./img/assets/spinner3.gif");
    imagen.setAttribute("alt", "Spinner girando");
    imagen.setAttribute("id", "spinner-girando");
    tabla.hidden = true;
    divSpinner.appendChild(imagen);
}

export function pararSpinner(){
    const imagen = document.getElementById("spinner-girando");
    const tabla = document.getElementById("tablaDinamica");
    imagen.remove();
    tabla.hidden = false;
    document.getElementById("btnEnviar").disabled = false;
}