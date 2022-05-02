'use strict';

let tabla = document.querySelector('#tbl-tareas tbody');
const input_filtro_tarea = document.querySelector('#txt-filtro-tarea');

const mostrar_modal_editar = async(tarea) =>{
    const { value: formValues } = await Swal.fire({
        title: 'Modificar Tarea',
        html: `<div>
        <label for="txt-tarea">Tarea</label>
        <input type="text" class="swal2-input" id="txt-tarea" required value="${tarea.nombre}">
      </div>
      <div>
        <label for="txt-descripcion">Descripción</label>
        <textarea class="swal2-input" id="txt-descripcion" required>${tarea.descripcion}</textarea>
      </div>
      <div>
        <label for="txt-encargado">Encargado</label>
        <input type="text" class="swal2-input" id="txt-encargado" required value="${tarea.encargado}">
      </div>
      <div>
        <label for="slt-estado">Estado</label>
        <select id="slt-estado" class="swal2-input" required value="${tarea.estado}">
          <option value="Pendiente">Pendiente</option>
          <option value="Realizada">Realizada</option>
        </select>
      </div>
      <div>
        <label for="txt-date">Fecha Limite</label>
        <input type="date" class="swal2-input" id="txt-date" required value="${tarea.fechalimite}">
      </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                tarea._id,
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
            text: '¿Modificar tarea?',
            showCancelButton: true,
            confirmButtonText: 'Sí'
        })
        if (accept) {
            // Servicio
            modificar_tarea(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5]);
        }
    };

};






const mostrar_tabla = async() => {
    let lista_tareas = await listar_tareas();
    let filtro = input_filtro_tarea.value.toLowerCase();
    tabla.innerHTML = '';

    lista_tareas.forEach(tarea => {

        if(tarea.encargado.toLowerCase().includes(filtro)){
            let fila = tabla.insertRow();


            fila.insertCell().innerHTML = tarea.nombre;
            fila.insertCell().innerHTML = tarea.descripcion;
            fila.insertCell().innerHTML = tarea.encargado;
            let celda_estado = fila.insertCell();
            celda_estado.innerHTML = tarea.estado;
            fila.insertCell().innerHTML = moment(tarea.fechalimite).utc().format('DD MMM YYYY');

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('a');
            boton_editar.setAttribute("class","fas fa-edit edit-btn");
            celda_editar.appendChild(boton_editar);

            boton_editar.addEventListener('click', () => {
                mostrar_modal_editar(tarea);
            });


            switch (tarea.estado) {
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

mostrar_tabla();

input_filtro_tarea.addEventListener('keyup' , mostrar_tabla);