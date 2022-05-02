/*'use strict';


const boton_iniciar = document.querySelector('#btn_iniciar');
const input_correo = document.querySelector('#txt-correo');
const input_contrasenna = document.querySelector('#txt-contrasenna');


const limpiar =()=>{ 
    input_correo.value = '';
    input_contrasenna.value = '';

};

    const validar = () =>{
        let error = false;
        let campos_requeridos = document.querySelectorAll(':required');
        let regex_correo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    
        campos_requeridos.forEach(campo =>{
    
            if(campo.value == '') {
                error = true;
                campo.classList.add('error-input');
            }else{
                campo.classList.remove('error-input');
            }
    
        });
    
        if(regex_correo.test(input_correo.value)){
            input_correo.classList.remove('error-input');
        } else {
            error = true;
            input_correo.classList.add('error-input');
        };

    
        if(error == false){
            obtener_datos();
        } else {
            Swal.fire({
                title: 'Por favor llene todos los espacios correctamente para continuar',
                icon:  'warning'
        });
    }  
};

      
const obtener_datos = () => {

    let correo = input_correo.value;
    let contrasenna = input_contrasenna.value;

    iniciar_sesion(correo, contrasenna);
};

boton_iniciar.addEventListener('click', validar);*/

'use strict';


const boton_iniciar = document.querySelector('#btn_iniciar');

const obtener_datos = async() => {
    let correo = document.querySelector('#txt-correo').value;
    let contrasenna = document.querySelector('#txt-contrasenna').value;
    iniciar_sesion(correo, contrasenna);
};


const validar = () =>{
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');
        
    campos_requeridos.forEach(campo =>{
    
        if(campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        }else{
            campo.classList.remove('error-input');
        }
    
    });
    
    
    if(error == false){
        obtener_datos();
    } else {
        Swal.fire({
            title: 'Por favor llene todos los espacios correctamente para continuar',
            icon:  'warning'
        });
    }  
};


boton_iniciar.addEventListener('click', validar);