import Personaje from "./Personaje.js";

export default class Monstruo extends Personaje{
    static getLocalStorage(){
        let personajes = [];
        let personaje = JSON.parse(localStorage.getItem(PersonajeChild.getMainKey()));
        if(personaje !== null){
            personajes.push(personaje);
        }
        return personajes;
    }

    constructor(id,nombre,fuerza,alias,defensa,miedo,tipo){
        super(id, nombre, fuerza);
        this.alias= alias;
        this.defensa = defensa;
        this.miedo = miedo;
        this.tipo = tipo;
    }

    static getMainKey(){
        return 'monstruos';
    }
}