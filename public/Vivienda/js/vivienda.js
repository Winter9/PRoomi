'use strict';

const boton_crear_tarea = document.querySelector('#btn-crear-tarea');


const mostrar_modal_registrar_tarea = async() => {
    const { value: formValues } = await Swal.fire({
        title: 'Crear Tarea',
        html: `<div>
        <label for="txt-tarea">Tarea</label>
        <input type="text" class="swal2-input" id="txt-tarea" required>
      </div>
      <div>
        <label for="txt-descripcion">Descripción</label>
        <textarea class="swal2-input" id="txt-descripcion" required></textarea>
      </div>
      <div>
        <label for="txt-encargado">Encargado</label>
        <input type="text" class="swal2-input" id="txt-encargado" required>
      </div>
      <div>
        <label for="slt-estado">Estado</label>
        <select id="slt-estado" class="swal2-input" required>
          <option value="Pendiente">Pendiente</option>
          <option value="Realizada">Realizada</option>
        </select>
      </div>
      <div>
        <label for="txt-date">Fecha Limite</label>
        <input type="date" class="swal2-input" id="txt-date" required>
      </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('txt-tarea').value,
                document.getElementById('txt-descripcion').value,
                document.getElementById('txt-encargado').value,
                document.getElementById('slt-estado').value,
                document.getElementById('txt-date').value
            ]
        }
    });

    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Crear tarea?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            registrar_tarea(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);

        }

    };
    mostrar_tabla();
};



boton_crear_tarea.addEventListener('click', mostrar_modal_registrar_tarea);




// tabla compras

const boton_crear_lista_compras = document.querySelector('#btn-crear-lista-compras');


const mostrar_modal_crear_lista_compras = async() => {
    const { value: formValues } = await Swal.fire({
        title: 'Crear lista de compras',
        html: `<div>
        <label for="txt-nombre-compras">Nombre</label>
        <input type="text" class="swal2-input" id="txt-nombre-compras" required>
      </div>
      <div>
        <label for="txt-productos">Productos</label>
        <textarea class="swal2-input" id="txt-productos" required></textarea>
      </div>
      <div>
        <label for="slt-estado-compras">Estado</label>
        <select id="slt-estado-compras" class="swal2-input" required>
          <option value="Pendiente">Pendiente</option>
          <option value="Realizada">Realizada</option>
        </select>
      </div>
      <div>
        <label for="txt-date-compras">Fecha de compra</label>
        <input type="date" class="swal2-input" id="txt-date-compras" required>
      </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('txt-nombre-compras').value,
                document.getElementById('txt-productos').value,
                document.getElementById('slt-estado-compras').value,
                document.getElementById('txt-date-compras').value
            ]
        }
    });

    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Crear lista de compras?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            registrar_lista_compras(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);

        }

    };
    mostrar_tabla_compras();
};



boton_crear_lista_compras.addEventListener('click', mostrar_modal_crear_lista_compras);




// Facturas



const boton_crear_factura = document.querySelector('#btn-crear-factura');
const foto_factura = document.querySelector('#foto-factura');



const mostrar_modal_crear_factura = async() => {
    const { value: formValues } = await Swal.fire({
        title: 'Registrar factura',
        html: `<div>
        <label for="slt-categoria">Categoria</label>
        <select id="slt-categoria" class="swal2-input" required>
          <option value="">--Seleccione una opción--</option>
          <option value="Agua">Agua</option>
          <option value="Luz">Luz</option>
          <option value="Compras del hogar">Compras del hogar</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <label for="txt-detalles">Detalles</label>
        <textarea class="swal2-input" id="txt-detalles" required></textarea>
      </div>
      <div>
        <label for="txt-monto">Monto</label>
        <span class="input-colon"><input type="number" class="swal2-input" id="txt-monto" required></span>
      </div>
      <div>
      <label for="txt-encargado">Encargado</label>
      <input type="text" class="swal2-input" id="txt-encargado" required>
    </div>
    <img id="foto-factura" class="modal-img">
    <button type="button" id="btn-foto" class="modal-btn" onclick="myFunction()">Subir foto</button>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
              document.getElementById('slt-categoria').value,
              document.getElementById('txt-detalles').value,
              document.getElementById('txt-monto').value,
              document.getElementById('txt-encargado').value,
              document.getElementById('foto-factura').src
            ]
        }
    });

    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Registrar factura?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            registrar_factura(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);

        }

    };
    mostrar_tabla_facturas();
    // boton_foto.addEventListener('click', () => {
    //   widget_cloudinary.open();
    // }, false);
};

function myFunction() {
  const imagen = document.querySelector('#foto-factura');
  let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'winterjs',
    uploadPreset: 'preset_winter'

}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});
widget_cloudinary.open();
}


boton_crear_factura.addEventListener('click', mostrar_modal_crear_factura);


