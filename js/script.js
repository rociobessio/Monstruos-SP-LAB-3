import {actualizarTabla,ordenarTabla } from "./tabla.js";
import Monstruo from "./Monstruo.js";
import { validarInput } from "./validaciones.js";

//--->Segundo PARCIAL
import { crearMonstruoAJAX,eliminarMontruoAXIOS,getMonstruosAJAX,
    getTipoMonstruosAJAX,modificarMontruoAJAX} from "./control.js"; 

import {actualizarForm,hideUnhideButtonsYLabel,cargarTipoMonstruos,mostrarAlerta} from "./formulario.js";



let id = null;//-->Es global, servira para las distintas functions
let index = null;
const $form = document.forms[0];
const $containerTabla = document.getElementById("tablaDinamica");
const $containerBotones = document.getElementById("botones");
const $select = document.getElementById("filtrado");
const selectTipoMonstruo = document.getElementById("IDTipo");
const selectFiltrado = document.getElementById("filtrado");
const alertContainer = document.getElementById('alertId');


const listaTiposMonstruos = await getTipoMonstruosAJAX();//-->Traigo los tipos del db.json
const lista = await getMonstruosAJAX();//-->Traigo los monstruos del db.json
ordenarTabla(lista);//-->Ordeno la tabla por miedo en la lista

let listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
let listadoCheck = listaFiltrada;

//-->Verifico que los traiga
console.log(listaFiltrada);

const checkbox = document.querySelectorAll(".chbox");
checkbox.forEach(element => {element.checked = true;});

window.addEventListener("load", ()=>{$form.reset();});

$containerBotones.addEventListener("click", async (e) => 
{
    e.preventDefault();//-->Para que NO SE RECARGUE LA PAGINA
    const boton = e.target.textContent;
    const { txtId, txtNombre, rangeFuerza, txtAlias, defensa, rangeMiedo, tipo } = $form;

    if(boton == "Guardar"){//-->Para guardar un monstruo
        console.log("dentro de guardar");
        if (txtId.value.trim().length === 0) {
            console.log(txtId);
            if(validarInput($form)){
                const nuevoMonstruo = new Monstruo(
                    Date.now(),
                    txtNombre.value,
                    parseInt(rangeFuerza.value),
                    txtAlias.value,
                    defensa.value,
                    parseInt(rangeMiedo.value),
                    tipo.value
                );
                crearMonstruoAJAX(nuevoMonstruo);
                // $containerTabla.style.display = "flex";
                console.log(nuevoMonstruo);
                hideUnhideButtonsYLabel(true);
                $form.reset();
            }
            else{    
                // alert("Ingreso invalido de parametros!");
                mostrarAlerta(alertContainer,"No se pueden ingresar números o espacios en blanco!");
                // setTimeout(() => {$form.reset();}, 1000);
            }
        }
        
    } else if (boton === "Eliminar") {//-->Eliminar un monstruo
        // const index = $form.getAttribute("data-id");
        if (index && confirm("¿Desea eliminar al monstruo seleccionado?")) {
            eliminarMontruoAXIOS(index);
            $form.reset();
        }
    } else if (boton === "Cancelar") {
        $form.reset();
    }
    else if (boton === "Modificar"){//-->Modificar un monstruo
        console.log("en modificar");
        if (validarInput($form)){
            if(confirm("¿Desea modificar al monstruo?")){
                const modMonstruo = new Monstruo(
                    parseInt(txtId.value),
                    txtNombre.value,
                    parseInt(rangeFuerza.value),
                    txtAlias.value,
                    defensa.value,
                    parseInt(rangeMiedo.value),
                    tipo.value
                );
                modificarMontruoAJAX(modMonstruo);
                hideUnhideButtonsYLabel(true);
                $form.reset();
            }
        }
        else{
            // setTimeout(() => {$form.reset();}, 1000);
            mostrarAlerta(alertContainer,"No se pueden ingresar números o espacios en blanco!");
        }
    }
});

/**
 * Trabajara sobre la tabla en el evento click.
 * Al presionar sobre una td se obtiene el id
 * seleccionado que servira para trabajar sobre
 * el crud.
 * 
 * Luego al presionar la th me va a ordenar la tabla
 * segun los valores d la th elegida.
 */
$containerTabla.addEventListener("click", (e)=>
{   
    //-->Clickeo en la td
    if(e.target.matches("td"))
    {
        console.log("Click en td");
        const id = parseInt(e.target.parentElement.dataset.id);
        //-->Almaceno la id seleccionada
        console.log("ID: ",id);
        hideUnhideButtonsYLabel(false); 
        //-->Muestro la info del id seleccionado
        const monstruoSeleccionado = listaFiltrada.find((monster) =>{
            return monster.id === id;
        });
        index = id;
        console.log("Monstruo seleccionado:", monstruoSeleccionado);
        actualizarForm($form,monstruoSeleccionado);//-->Se carga la info al form
    }
});

/**
 * Esta funcion me permitira filtrar
 * la tabla de monstruos dependiendo
 * de la opcion seleccionada.
 * Se utiliza la funcion filter ademas,
 * recorriendo la lista buscando la coincidencia
 * por tipo de monstruo.
 * 
 * CONSIGNA:
 * Agregar una sección que permita filtrar la tabla que se muestra por pantalla por tipo de
 * monstruo cuyas opciones son Todos/Vampiro/Hombre
 * Lobo/Fantasma/Esqueleto/Bruja/Zombie. Por defecto debe ser todos
 * @param {*} contenedor 
 * @param {*} lista 
 * @param {*} filtro 
 * @returns 
 */
function filtrarTabla(contenedor, lista, filtro)
{
    if(filtro != "Todos")
    {
        let listaFiltrada = lista.filter((elemento)=>elemento.tipo == filtro);

        // if(listaFiltrada.length === 0) alert("No hay registros del tipo de monstruo: " + filtro);
        actualizarTabla(contenedor, listaFiltrada);

        // console.log(listaFiltrada);//-->Ver lista filtrada.
        return listaFiltrada;
    }
    else
    {
        actualizarTabla(contenedor, lista);
        return lista;
    }
    // }
    // else alert("No hay monstruos con el tipo: " + filtro);
}

/**
 * Al ir cambiando el select 
 * de tipos de monstruos se va filtrando
 * la lista de los monstruos.
 */
$select.addEventListener("change", () => 
{
    listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
    console.log(listaFiltrada);
    checkbox.forEach(element => {element.checked = true;});
    $form.reset();
});

/**
 * Aca se utiliza la funcion MAP.
 * Cada vez que se seleccione 
 * un valor de los checkboxes para filtrar
 * se quitara/pondra dicho valor al imprimir
 * la tabla de los monstruos. Se mostrarán
 * aquellas columnas deseadas.
 * 
 * CONSIGNA:
 * Agregar controles que permitan seleccionar las columnas que deben aparecer en la tabla
 * de monstruos. Por defecto todas las columnas deben ser visibles.
 */
const modificarTabla = () =>
{
    const checked = {};
    checkbox.forEach((elem) => {checked[elem.name] = elem.checked});

    listadoCheck = listaFiltrada.map((elem) =>
    {
        const nuevoElemento = {};
        for (const key in elem)
        {
            if(key == "id" || checked[key] == true)
            {
                nuevoElemento[key] = elem[key];
            }
        }
        return nuevoElemento;
    });
    actualizarTabla($containerTabla, listadoCheck);
};
/**
 * Es el evento click sobre
 * los checkboxes, al desclikear/clikear 
 * se llama a la funcion modificarTabla
 */
checkbox.forEach((elem) => elem.addEventListener("click", modificarTabla));

/**
 * Evento para que al ir bajando por
 * la pagina aparezca la calabaza
 * la cual me lleva al comienzo de la pagina.
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

//-->Cargo los selects de la pagina
cargarTipoMonstruos(listaTiposMonstruos,selectTipoMonstruo,false);
cargarTipoMonstruos(listaTiposMonstruos,selectFiltrado,true);

