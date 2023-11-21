import {girarSpinner,pararSpinner} from "./spinner.js";
const delaySpinner = 2000;

export const crearTabla = (data) => {
    const tabla = document.createElement("table");

    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
    return tabla;
};

const crearCabecera = (elemento) => {
    const tHead = document.createElement("thead");
    const headRow = document.createElement("tr");

    for (const key in elemento) {
        // console.log(elemento);
        if(key === "id") continue;
         
        const th = document.createElement("th");
        th.textContent = key;
        headRow.appendChild(th);
    }

    tHead.appendChild(headRow);

    return tHead;
};

const crearCuerpo = (data) => {
    const tBody = document.createElement("tbody");
    
    data.forEach((element) => {
        const tr = document.createElement("tr");
        

        for (const key in element) {
            if(key === "id"){//-->Para ocultar la id
                tr.dataset.id = element[key];
            }
            else{
                // console.log(element);
                const td = document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    });

    return tBody;
};

/**
 * Constenedor ser la division
 * y data el array
 * @param {*} contenedor 
 * @param {*} data 
 */
export const actualizarTabla = (contenedor,data) =>{
    if(data.length > 0){

        while(contenedor.hasChildNodes()){
            contenedor.removeChild(contenedor.firstChild);
        }
        girarSpinner();
        setTimeout(() => {pararSpinner();}, delaySpinner);
        promedio.value = calcularPromedio(data);//-->Llamo para calcular el promedio

        contenedor.appendChild(crearTabla(data));
    }
};

//===================================== SEGUNDO PARCIAL =====================================================
/**
 * Esta function utiliza el metodo
 * reduce para poder calcular
 * el promedio del miedo de los
 * monstruos.
 * 
 * CONSIGNA;
 * Mostar en un input de solo lectura el promedio de nivel de miedo de los monstruos
 * representados en la tabla.
 * @param {*} lista 
 * @returns 
 */
function calcularPromedio(lista)
{
    let acumulador = lista.reduce((anterior, actual) =>
    {
        let acumulador = anterior + parseInt(actual.miedo);//-->Es por el miedo del monstruo
        return acumulador;
    }, 0);


    if(acumulador >= 1)//-->Que al menos acumulador sea mayor que 0
    {
        return Math.round(acumulador / lista.length);
    }
    else//-->Sino, no se pudo calcular.
    {
        return "No se calculo.";
    }
};

/**
 * Me permitira ORDENAR la tabla,
 * utilizando la funcion sort
 * 
 * CONSIGNA:
 * Los monstruos que figuran en la tabla deben estar ordenados de manera decreciente por
 * miedo
 * @param {*} lista 
 * @param {*} clave 
 */
export function ordenarTabla(lista) { 
    lista.sort((a, b) => b.miedo - a.miedo); 
}