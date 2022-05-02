'use strict';

let tabla_compras = document.querySelector('#tbl-compras tbody');
const input_filtro_compras = document.querySelector('#txt-filtro-compras');

const mostrar_modal_editar_lista_compras = async(lista_compras) =>{
    const { value: formValues } = await Swal.fire({
        title: 'Modificar lista de compras',
        html: `<div>
        <label for="txt-nombre-compras">Nombre</label>
        <input type="text" class="swal2-input" id="txt-nombre-compras" required value="${lista_compras.nombre}">
      </div>
      <div>
        <label for="txt-productos">Productos</label>
        <textarea class="swal2-input" id="txt-productos" required>${lista_compras.productos}</textarea>
      </div>
      <div>
        <label for="slt-estado-compras">Estado</label>
        <select id="slt-estado-compras" class="swal2-input" required value="${lista_compras.estado}">
          <option value="Pendiente">Pendiente</option>
          <option value="Realizada">Realizada</option>
        </select>
      </div>
      <div>
        <label for="txt-date-compras">Fecha de compra</label>
        <input type="date" class="swal2-input" id="txt-date-compras" required value="${lista_compras.fechacompra}">
      </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                lista_compras._id,
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
            text: '¿Modificar lista de compras?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            modificar_lista_compras(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);
        }
    };

};






const mostrar_tabla_compras = async() => {
    let lista_compras = await listar_lista_compras();
    let filtro_compras = input_filtro_compras.value.toLowerCase();
    tabla_compras.innerHTML = '';

    lista_compras.forEach(lista_compras => {

        if(lista_compras.nombre.toLowerCase().includes(filtro_compras)){
            let fila = tabla_compras.insertRow();


            fila.insertCell().innerHTML = lista_compras.nombre;
            fila.insertCell().innerHTML = lista_compras.productos;
            let celda_estado = fila.insertCell();
            celda_estado.innerHTML = lista_compras.estado;
            fila.insertCell().innerHTML = moment(lista_compras.fechacompra).utc().format('DD MMM YYYY');

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('a');
            boton_editar.setAttribute("class","fas fa-edit edit-btn");
            celda_editar.appendChild(boton_editar);

            boton_editar.addEventListener('click', () => {
                mostrar_modal_editar_lista_compras(lista_compras);
            });


            switch (lista_compras.estado) {
                case 'Realizada':
                    celda_estado.classList.add('estado-realizada');
                    break;
                default:
                    celda_estado.classList.add('estado-pendiente');
                    break;
    
            }
        }

    });
};

mostrar_tabla_compras();

input_filtro_compras.addEventListener('keyup' , mostrar_tabla_compras);