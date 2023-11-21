export function obtenerLocalStorage(clave){
    const data = JSON.parse(localStorage.getItem(clave)) || [];
    console.log('LocalStorage - Datos obtenidos:', data);
    return data;
    // return JSON.parse(localStorage.getItem(clave)) || [];
}

export function setLocalStorage(clave,data){
    localStorage.setItem(clave, JSON.stringify(data));
    console.log('LocalStorage - Datos guardados:', data);
    // localStorage.setItem(clave,JSON.stringify(data));
}