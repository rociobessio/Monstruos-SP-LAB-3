import {girarSpinner,pararSpinner} from './spinner.js';
const miURL = "http://localhost:3000/monstruos";
const tipoMonstruosURL = "http://localhost:3000/tipoMonstruos";

//Reemplazar la capa de acceso a datos por llamadas Ajax al servidor.

//============================= OBTENER CARDS CON FETCH =============================
/**
 * Me permitira obtener las cards.
 * Utilizar fetch para el “get” de la página principal.
 * @returns 
 */
export const getCardsFetch = () =>{
    return new Promise((resolve,reject) =>{
        fetch(miURL)
        .then((respuesta) =>{
            if(respuesta.ok) return resolve(respuesta.json());
            else reject(respuesta);
        })
        .catch((error) =>{
            return reject(error.message);
        })
    });
};
//============================= METODOS AXIOS/AJAX =============================
/**
 * Me permitira obtener los tipos de monstruos
 * utilizando AJAX.
 * El spinner debe ser visible mientras se realizan dichas operaciones.
 * Utilizar XMLHTTPRequest en al menos dos de las cuatro operaciones.
 * @returns 
 */
export const getTipoMonstruosAJAX = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            pararSpinner();
        }
    });
    xhr.open("GET", tipoMonstruosURL);
    xhr.send();
    });
};

/**
 * Me permite obtener TODOS los monstruos
 * del archivo db.json mediante AJAX
 * El spinner debe ser visible mientras se realizan dichas operaciones.
 * Utilizar XMLHTTPRequest en al menos dos de las cuatro operaciones.
 * @returns 
 */
export const getMonstruosAJAX = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            pararSpinner();
        }
    });
    xhr.open("GET", miURL);
    xhr.send();
    });
};

/**
 * El spinner debe ser visible mientras se realizan dichas operaciones.
 * Reemplazar la capa de acceso a datos por llamadas Ajax al servidor.
 * Utilizar XMLHTTPRequest en al menos dos de las cuatro operaciones.
 * @param {*} monstruo 
 */
export const crearMonstruoAJAX = (monstruo) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            pararSpinner();
        }
    });
    xhr.open("POST", miURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};

/**
 * Utilizar axios para el “delete” de monstruo.
 * El spinner debe ser visible mientras se realizan dichas operaciones.
 * @param {*} monstruo 
 */
export const eliminarMontruoAXIOS = async (id) => 
{
    girarSpinner();
    try 
    {
        let {datos} = await axios.delete(miURL + "/" + id);
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        pararSpinner();
    }
};

/**
  * El spinner debe ser visible mientras se realizan dichas operaciones.
  * Reemplazar la capa de acceso a datos por llamadas Ajax al servidor.
  * Utilizar XMLHTTPRequest en al menos dos de las cuatro operaciones.
 * @param {*} monstruo 
 */
export const modificarMontruoAJAX = (monstruo) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            pararSpinner();
        }
    });
    xhr.open("PUT", miURL + "/" + monstruo.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(monstruo));
};