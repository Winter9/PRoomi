'use strict';


const registrar_factura = async( categoria, detalles, monto, encargado, imagen) =>{

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-factura',
        responseType: 'json',
        data: {
            categoria: categoria,
            detalles: detalles,
            monto: monto,
            encargado: encargado,
            imagen: imagen
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su factura se ha registrado correctamente',
            icon:  'success',
        });
    }).catch((response) => {
        Swal.fire({
            title: 'Su factura no se pudo registrar, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};


const listar_facturas = async() =>{
    let lista_facturas = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-facturas',
        responseType: 'json'
    }).then((response) => {
        lista_facturas  = response.data.lista_facturas;
        
    }).catch((response) => {
       

    });

    return lista_facturas;

};


const modificar_factura = async(_id, categoria, detalles, monto, encargado, imagen) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-factura',
        responseType: 'json',
        data: {
            _id,
            categoria: categoria,
            detalles: detalles,
            monto: monto,
            encargado: encargado,
            imagen: imagen
        }
    }).then((response) => {
        Swal.fire({
            title: 'Su factura se ha modificado correctamente',
            icon:  'success',
        }).then(() => {
            mostrar_tabla_facturas();
    });
    }).catch((response) => {
        Swal.fire({
            title: 'Su factura no se pudo modificar, ocurrio el siguiente error: ',
            icon:  'error',
            text: response.data.err
        });

    });

};