'use strict';

const boton_enviar = document.querySelector('#btn-enviar');
const input_nombre = document.querySelector('#txt-nombre');
const input_nombre2 = document.querySelector('#txt-nombre2');


const limpiar =()=>{
    input_nombre.value ='';
    input_nombre2.value = '';
};


//Validacion

const validar = () =>{
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');

    campos_requeridos.forEach(campo =>{
        if(campo.value ==  ''){
            error = true;
            campo.classList.add('error-input');
        } else{
            campo.classList.remove('error-input');
        }
    });




    if(error){
        Swal.fire({
            title: 'No se ha podido enviar su encuesta',
            icon:  'warning',
            text:  'Por favor complete todos los campos'
        });
    } else {
        obtener_datos();
        Swal.fire({
            title: 'Su encuesta se ha enviado correctamente',
            icon:  'success',
            text:  'Gracias por su tiempo'
        }).then(()=>{
            limpiar();

        });
    }



};

const obtener_datos = () => {
    let nombre = input_nombre.value;
    let nombre2 = input_nombre2.value;

};

/*
//Validacion Radio

const validarRadio = () =>{
    let valid = false;
    let radio_req = document.myform.Pregunta1;

    for(let i=0;i<radio_req.length;i++){
        if(radio_req[i].checked){
            valid = true;
            break;
        }
    }

}
*/
boton_enviar.addEventListener('click', validar);
