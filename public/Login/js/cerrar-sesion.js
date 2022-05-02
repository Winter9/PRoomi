'use strict';
const btn_cerrar = document.querySelector('#btn-cerrar-sesion');

btn_cerrar.addEventListener('click', () =>{
    localStorage.clear();
    window.location.href = '../Login/iniciar.html';
});