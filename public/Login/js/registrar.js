'use strict';


const btn_registrar = document.querySelector('#btn-registrar');
const input_nombre = document.querySelector('#txt-nombre');
const input_apellido = document.querySelector('#txt-apellidos');
const input_cedula = document.querySelector('#txt-cedula');
const input_correo = document.querySelector('#txt-correo');
const input_telefono = document.querySelector('#txt-telefono');
const input_contrasenna = document.querySelector('#txt-contrasenna');


const limpiar =()=>{ 
    input_nombre.value = '';
    input_apellido.value = '';
    input_cedula.value = '';
    input_correo.value = '';
    input_telefono.value = '';
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

    
        if(error){
            Swal.fire({
                title: 'Por favor llene todos los espacios correctamente para continuar',
                icon:  'warning',
            });
        } else {
            obtener_datos();
        };
            
      };

const obtener_datos = () => {

    let nombre = input_nombre.value;
    let apellido = input_apellido.value;
    let cedula = input_cedula.value;
    let correo = input_correo.value;
    let telefono = input_telefono.value;
    let contrasenna = input_contrasenna.value;

    registrar_usuario(nombre, apellido, cedula, correo, telefono, contrasenna);
};

btn_registrar.addEventListener('click', validar);
