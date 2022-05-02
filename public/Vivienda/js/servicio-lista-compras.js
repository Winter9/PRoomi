'use strict';


const registrar_lista_compras = async( nombre, productos, estado, fechacompra) =>{

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-lista-compras',
        responseType: 'json',
        data: {
            nombre: nombre,
            productos: productos,
            estado: estado,
            fechacompra: fechacompra
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su lista de compras se ha creado correctamente',
            icon:  'success',
        });
    }).catch((response) => {
        Swal.fire({
            title: 'Su lista de compras no se pudo crear, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};


const listar_lista_compras = async() =>{
    let lista_compras = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-lista-compras',
        responseType: 'json'
    }).then((response) => {
        lista_compras  = response.data.lista_compras;
        
    }).catch((response) => {
       

    });

    return lista_compras;

};


const modificar_lista_compras = async(_id, nombre, productos, estado, fechacompra) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-lista-compras',
        responseType: 'json',
        data: {
            _id,
            nombre: nombre,
            productos: productos,
            estado: estado,
            fechacompra: fechacompra
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su lista de compras se ha modificado correctamente',
            icon:  'success',
        }).then(() => {
            mostrar_tabla();
    });
    }).catch((response) => {
        Swal.fire({
            title: 'Su lista de compras no se pudo modificar, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};