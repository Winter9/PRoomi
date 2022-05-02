'use strict';

const registrar_usuario = async(nombre, apellido, cedula, correo, telefono, contrasenna, contacto_emergencia, parentesco_contacto, telefono_parentesco, tipo) =>{
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar_usuario',
        responseType: 'json',
        data: {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            correo: correo,
            telefono: telefono,
            contrasenna: contrasenna,
            contacto_emergencia: contacto_emergencia,
            parentesco_contacto: parentesco_contacto,
            telefono_parentesco: telefono_parentesco,
            tipo: tipo
        }
    }).then((response) => {
        Swal.fire({
            title: 'Estás a un paso de crear tu cuenta',
            icon:  'success',
            text:  'Elige tu rol a continuación'
        }).then(()=>{
            limpiar();
            window.location='elegir-rol.html';

        });
    }).catch((response) => {
        Swal.fire({
            title: 'Su registro no se pudo realizar',
            icon:  'error',
            text:  response.data.err
        });
    });
};


const listar_usuarios = async() =>{
    let lista_usuarios = [];
    
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-usuarios',
        responseType: 'json',
        
    }).then((response) => {
        lista_usuarios = response.data.lista_usuarios
    }).catch((response) => {
        
    });

    return lista_usuarios;
};

let iniciar_sesion = async(correo, contrasenna) => {
    try {
        const response = await axios({
            method: 'get',
            params: { correo: correo, contrasenna: contrasenna },
            url: `http://localhost:3000/api/iniciar-sesion`,
            responseType: 'json'
        });
        if (response.data.estado == true) {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Ha iniciado sesión correctamente'
            }).then(() => {
                sessionStorage.setItem('tipo_usuario', response.data.tipo);
                sessionStorage.setItem('nombre_usuario', response.data.nombre);
                window.location='/public/Info/index.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No ha podido iniciar sesión',
                text: 'Usuario o contraseña incorrectos'
            });
            
        }
    } catch (error) {
        console.log(error);
    }
};
