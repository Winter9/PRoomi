'use strict';

let tabla_facturas = document.querySelector('#tbl-facturas tbody');
const input_filtro_facturas = document.querySelector('#txt-filtro-facturas');

const mostrar_modal_editar_factura = async(factura) =>{
    const { value: formValues } = await Swal.fire({
        title: 'Modificar factura',
        html: `<div>
        <label for="slt-categoria">Categoria</label>
        <select id="slt-categoria" class="swal2-input" required value="${factura.categoria}">
          <option value="">--Seleccione una opción--</option>
          <option value="Agua">Agua</option>
          <option value="Luz">Luz</option>
          <option value="Compras del hogar">Compras del hogar</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <label for="txt-detalles">Detalles</label>
        <textarea class="swal2-input" id="txt-detalles" required>${factura.detalles}</textarea>
      </div>
      <div>
        <label for="txt-monto">Monto</label>
        <span class="input-colon"><input type="number" class="swal2-input" id="txt-monto" required value="${factura.monto}"></span>
      </div>
      <div>
      <label for="txt-encargado">Encargado</label>
      <input type="text" class="swal2-input" id="txt-encargado" required value="${factura.encargado}">
    </div>
    <div>
        <img id="foto-factura" class="modal-img" src="${factura.imagen}">
        <button class="modal-btn" id="btn-foto" type="button" onclick="myFunction()">Editar foto</button>
    </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                factura._id,
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
            text: '¿Modificar factura?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            modificar_factura(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5]);
        }
    };

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
const mostrar_modal_detalles_factura = async(factura) =>{
    const { value: formValues } = await Swal.fire({
        title: 'Detalles de la factura',
        html: `<div>
        <label for="slt-categoria">Categoria</label>
        <input type="text" class="swal2-input" id="slt-encargado" required disabled value="${factura.categoria}">

      </div>
      <div>
        <label for="txt-detalles">Detalles</label>
        <textarea class="swal2-input" id="txt-detalles" required disabled>${factura.detalles}</textarea>
      </div>
      <div>
        <label for="txt-monto">Monto</label>
        <span class="input-colon"><input type="number" class="swal2-input" id="txt-monto" required disabled value="${factura.monto}"></span>
      </div>
      <div>
      <label for="txt-encargado">Encargado</label>
      <input type="text" class="swal2-input" id="txt-encargado" required disabled value="${factura.encargado}">
    </div>
    <div>
        <img id="foto-factura" class="modal-img" src="${factura.imagen}">
    </div>`
    });


};






const mostrar_tabla_facturas = async() => {
    let lista_facturas = await listar_facturas();
    let filtro = input_filtro_facturas.value.toLowerCase();
    tabla_facturas.innerHTML = '';

    lista_facturas.forEach(factura => {

        if(factura.categoria.toLowerCase().includes(filtro)){
            let fila = tabla_facturas.insertRow();


            fila.insertCell().innerHTML = factura.categoria;
            fila.insertCell().innerHTML = factura.detalles;
            fila.insertCell().innerHTML = factura.monto;
            fila.insertCell().innerHTML = factura.encargado;


            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('a');
            boton_editar.setAttribute("class","fas fa-edit edit-btn");
            celda_editar.appendChild(boton_editar);

            boton_editar.addEventListener('click', () => {
                mostrar_modal_editar_factura(factura);
            });

            let celda_detalles = fila.insertCell();
            let boton_detalles = document.createElement('a');

            boton_detalles.setAttribute("class","fas fa-info-circle edit-btn");
            celda_detalles.appendChild(boton_detalles);

            boton_detalles.addEventListener('click', () => {
                mostrar_modal_detalles_factura(factura);
            });

        }

    });
};

mostrar_tabla_facturas();

input_filtro_facturas.addEventListener('keyup' , mostrar_tabla_facturas);