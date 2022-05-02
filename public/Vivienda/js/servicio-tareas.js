'use strict';


const registrar_tarea = async( nombre, descripcion, encargado, estado, fechalimite) =>{

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tarea',
        responseType: 'json',
        data: {
            nombre: nombre,
            descripcion: descripcion,
            encargado: encargado,
            estado: estado,
            fechalimite: fechalimite
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su tarea se ha registrado correctamente',
            icon:  'success',
        });
    }).catch((response) => {
        Swal.fire({
            title: 'Su tarea no se pudo registrar, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};


const listar_tareas = async() =>{
    let lista_tareas = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tareas',
        responseType: 'json'
    }).then((response) => {
        lista_tareas  = response.data.lista_tareas;
        
    }).catch((response) => {
       

    });

    return lista_tareas;

};


const modificar_tarea = async(_id, nombre, descripcion, encargado, estado, fechalimite) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-tarea',
        responseType: 'json',
        data: {
            _id,
            nombre: nombre,
            descripcion: descripcion,
            encargado: encargado,
            estado: estado,
            fechalimite: fechalimite
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su tarea se ha modificado correctamente',
            icon:  'success',
        }).then(() => {
            mostrar_tabla();
    });
    }).catch((response) => {
        Swal.fire({
            title: 'Su tarea no se pudo modificar, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};