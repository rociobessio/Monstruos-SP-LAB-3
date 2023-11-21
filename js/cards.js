import Monstruo from "./Monstruo.js";

import { getCardsFetch } from "./control.js";

//-->Cargo las cards de los monstruos
const listaMonstruos = await getCardsFetch();
console.log(listaMonstruos);

//-->Obtengo la seccion de las cards
const seccionCards = document.querySelector("#cards-monstruos");


//-->Utilizar la biblioteca Bootstrap y su esquema de columnas donde sea conveniente para
//lograr un comportamiento “responsive”
//-->Se crearan con bootstrap
const container = document.createElement("div");
container.className = "container";

//-->Voy creando una por una con clases de bootstrap
listaMonstruos.forEach((elemento) =>{ 
    const columna = document.createElement("div");
    columna.className = "col-md-4";

    const monstruo = crearCards(elemento);

    // Añado la tarjeta a la columna
    columna.appendChild(monstruo);

    // Añado la columna al contenedor
    container.appendChild(columna);
});

seccionCards.appendChild(container);

/**
 * Esta funcion me permitira crear las
 * cards de los monstruos
 * @param {*} item 
 * @returns 
 */
function crearCards(item) {
    const card = document.createElement("div");
    card.className = "card";//-->Asigno la clase "card" a la carta

    //-->Creo elementos para mostrar la información del monstruo
    const nombre = document.createElement("h2");
    nombre.textContent = item.nombre;

    const aliasContainer = document.createElement("div");
    aliasContainer.className = "card-property";
    const aliasLabel = document.createElement("span");
    aliasLabel.className = "label";
    aliasLabel.textContent = "Alias:";
    const alias = document.createElement("span");
    alias.textContent = item.alias;

    // const defensa = document.createElement("p");
    // defensa.textContent = item.defensa;

    const defensaContainer = document.createElement("div");
    defensaContainer.className = "card-property";
    const defensaLabel = document.createElement("span");
    defensaLabel.className = "label";
    defensaLabel.textContent = "Defensa:";
    const defensa = document.createElement("span");
    defensa.textContent = item.defensa;
 
    const miedoContainer = document.createElement("div");
    miedoContainer.className = "card-property";
    const miedoLabel = document.createElement("span");
    miedoLabel.className = "label";
    miedoLabel.textContent = "Miedo:";
    const miedo = document.createElement("span");
    miedo.textContent = item.miedo; 
    
    const fuerzaContainer = document.createElement("div");
    fuerzaContainer.className = "card-property";
    const fuerzaLabel = document.createElement("span");
    fuerzaLabel.className = "label";
    fuerzaLabel.textContent = "Fuerza:";
    const fuerza = document.createElement("span");
    fuerza.textContent = item.fuerza; 
        
    const tipoContainer = document.createElement("div");
    tipoContainer.className = "card-property";
    const tipoLabel = document.createElement("span");
    tipoLabel.className = "label";
    tipoLabel.textContent = "Tipo:";
    const tipo = document.createElement("span");
    tipo.textContent = item.tipo;

    aliasContainer.appendChild(aliasLabel);
    aliasContainer.appendChild(alias);
    defensaContainer.appendChild(defensaLabel);
    defensaContainer.appendChild(defensa);
    miedoContainer.appendChild(miedoLabel);
    miedoContainer.appendChild(miedo);
    fuerzaContainer.appendChild(fuerzaLabel);
    fuerzaContainer.appendChild(fuerza);
    tipoContainer.appendChild(tipoLabel);
    tipoContainer.appendChild(tipo);

    //-->Añado al card
    card.appendChild(nombre);
    card.appendChild(aliasContainer);
    card.appendChild(defensaContainer);
    card.appendChild(miedoContainer);
    card.appendChild(fuerzaContainer);
    card.appendChild(tipoContainer);

    return card;//-->Retorno la carta 
}

/**
 * Al scrollear hasta abajo de todo
 * me permitira volver hacia arriba.
 */
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    const btnArriba = document.getElementById('btnArriba');

    if (scroll > 100) {
        btnArriba.style.display = 'block'; 
    } else {
        btnArriba.style.display = 'none'; 
    }
});
