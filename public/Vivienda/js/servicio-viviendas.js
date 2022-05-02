'use strict';

const registrar_vivienda = async(titulo, ubicacion, cuartos, descripcion, imagen, reglas) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-vivienda',
        responseType: 'json',
        data: {
            titulo: titulo,
            ubicacion: ubicacion,
            cuartos: cuartos,
            descripcion: descripcion,
            imagen: imagen
        }
    }).then((res) => {
        registrar_reglas(res.data.vivienda_bd._id, reglas);
        Swal.fire({
            'title': 'Tu vivienda ha sido registrada correctamente',
            'icon': 'success',
            'text': 'Te redireccionaremos a tu vivienda'
        }).then(() => {
            // limpiar();
            window.location='./perfilvivienda.html';
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': 'pppp'
        })
    });

};

let registrar_reglas = async(_id, reglas) =>{
    await axios({
        method:  'post',
        url: 'http://localhost:3000/api/registrar-regla',
        responseType: 'json',
        data: {
            '_id': _id,
            'reglas': reglas
        }
    }).then((res) =>{
        if(res.data.resultado == false) {
            
        }else{

        }
    })
};


const listar_viviendas = async() =>{
    let lista_viviendas = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-viviendas',
        responseType: 'json'
    }).then((response) => {
        lista_viviendas  = response.data.lista_viviendas;
        
    }).catch((response) => {
       

    });

    return lista_viviendas;

};