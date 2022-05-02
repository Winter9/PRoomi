'use strict';

const tabla = document.querySelector('#tbl-usuarios tbody');
const input_buscar = document.querySelector('#txt-buscar');

const mostrar_datos = async() => {
    let lista_usuarios = await listar_usuarios();
    let buscar = input_buscar.value.toLowerCase();
    tabla.innerHTML = '';

    lista_usuarios.forEach(usuario =>{

        if (usuario.nombre.toLowerCase().includes(buscar)) {
            let fila = tabla.insertRow();

            fila.insertCell().innerHTML = usuario._id;
            fila.insertCell().innerHTML = usuario.nombre;
            fila.insertCell().innerHTML = usuario.cedula;
            fila.insertCell().innerHTML = usuario.correo;
        }
    });
};

mostrar_datos();
input_buscar.addEventListener('keyup', mostrar_datos);