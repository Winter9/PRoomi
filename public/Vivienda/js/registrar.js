
'use strict';
const btn_registrar = document.querySelector('#btn_registrar');


let validar = () =>{
    let inputs_requeridos = document.querySelectorAll('#frm_registro [required]');
    let error = false;

    for(let i = 0; i < inputs_requeridos.length; i++){
        if (inputs_requeridos[i].value == ''){
            inputs_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            inputs_requeridos[i].classList.remove('input-error');
        }
    }

    return error;
};

let obtener_datos = () =>{
    let error = validar();
        
    if(error){
        Swal.fire({
            'title': 'Sus datos no se pueden enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon' : 'warning'
        });
    }else {
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon' : 'success'
        });
    }
};

btn_registrar.addEventListener('click' , obtener_datos);
