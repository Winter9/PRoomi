'use strict';

const input_nombre = document.querySelector('#Rnombre');
const input_primerapellido = document.querySelector('#Rprimerapellido');
const input_segundoapellido = document.querySelector('#Rsegundoapellido');
const input_telefono = document.querySelector('#Rtelefono');
const input_correo = document.querySelector('#Rcorreo');
const input_contrasenna = document.querySelector('#Rcontraseña');
const input_contrasennaconfirmacion = document.querySelector('#Rconfirmarcontraseña');
const input_contacto = document.querySelector('#Rcontacto');
const input_contactoparentesco = document.querySelector('#Rparentesco');
const input_telefonoparentesco = document.querySelector('#Rtelefonoparentesco');
const input_direccion = document.querySelector('#Rdireccion');
const btn_botondeguardar = document.querySelector('#botondeguardar');

const limpiar =()=>{ 

input_nombre.value = '';
input_primerapellido.value = '';
input_segundoapellido.value = '';
input_telefono.value = '';
input_correo.value = '';
input_contrasenna.value = '';
input_contrasennaconfirmacion.value = '';
input_contacto.value = '';
input_contactoparentesco.value = '';
input_telefonoparentesco.value = '';
input_direccion.value = '';

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
                title: 'Por favor llene todos los espacios correctamente completar el proceso',
                icon:  'warning',
            });
        } else {
            obtener_datos();
            Swal.fire({
                title: 'Haz actualizado tus datos con éxito',
                icon:  'success',
                text:  'Verifica los datos en tu perfil'
            }).then(()=>{
                limpiar();
                window.location='/Login/elegir-rol.html';
    
            });
        };
            
      };

const obtener_datos = () => {

    let nombre = input_nombre.value;
    let primerapellido = input_primerapellido.value;
    let segundoapellido = input_segundoapellido.value;
    let telefono = input_telefono.value;
    let correo = input_correo.value;
    let contrasenna = input_contrasenna.value;
    let contrasennaconfirmacion = input_contrasennaconfirmacion.value;
    let contacto = input_contacto.value;
    let contactoparentesco =  input_contactoparentesco.value;
    let telefonoparentesco = input_telefonoparentesco.value;
    let direccion = input_direccion.value;

};

btn_botondeguardar.addEventListener('click', validar);