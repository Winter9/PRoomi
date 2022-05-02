'use strict';

const boton_foto = document.querySelector('#btn-foto-vivienda');
const imagen = document.querySelector('#foto-vivienda');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'winterjs',
    uploadPreset: 'preset_winter'

}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});


boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);