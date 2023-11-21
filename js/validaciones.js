export function validarInput($form){
    let todoOk = false;
    if(!contieneNumeros($form.txtNombre.value) &&
    !contieneNumeros($form.txtAlias.value) &&
    !esCampoVacio($form.txtNombre.value) &&
    !esCampoVacio($form.txtAlias.value)){
        todoOk = true;
    }
    return todoOk;
}

function contieneNumeros(valor) {
    return /\d/.test(valor);
}

function esCampoVacio(valor) {
    return valor.trim() === '';
}
