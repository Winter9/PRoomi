'use strict';


const boton_recuperar = document.querySelector('#btn_recuperar');
const input_correo = document.querySelector('#txt-correo');


const limpiar =()=>{ 
    input_correo.value = '';
};

const recuperar_contrasenna = async() => {
    const { value: formValues } = await Swal.fire({
        title: 'Ingrese su correo electrónico para recuperar la contraseña',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementaryByID('txt-correo').value
            ]
        }
    });

    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Está seguro que desea restablecer la contraseña?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            restablecer_contrasenna(formValues[0]);
        }
    };
};

boton_recuperar.addEventListener('click', recuperar_contrasenna);
