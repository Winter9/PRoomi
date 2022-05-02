'use strict';
const btn_guardar = document.querySelector('#botonguardar');

const obtener_datos = () => {

    let titulo = document.querySelector('#Rtitulov').value;
    let ubicacion = document.querySelector('#Rubicacionv').value;
    let cuartos = document.querySelector('#Rcuartos').value;
    let descripcion = document.querySelector('#Rdescripcionv').value;
    let imagen = document.querySelector('#foto-vivienda').src;
    let inputs_reglas = document.querySelectorAll('#reglas-checkbox input[type=checkbox]:checked');
    let reglas = [];

    inputs_reglas.forEach(input =>{
        reglas.push(input.value);
    });
    
    
    registrar_vivienda(titulo, ubicacion, cuartos, descripcion, imagen, JSON.stringify(reglas))
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

    if(error){
        Swal.fire({
            title: 'Por favor llene todos los espacios correctamente para continuar',
            icon:  'warning',
        });
    } else {
        obtener_datos();
    };
        
  };

btn_guardar.addEventListener('click', validar);