'use strict';


const seccion = document.getElementById('seccion');
const contenedor = document.getElementById('contenedor-anuncios');



const mostrar_anuncio = async() => {
    let lista_viviendas = await listar_viviendas();

    seccion.appendChild(contenedor);



    lista_viviendas.forEach(vivienda => {
        
        let anuncio = document.createElement('div');
        anuncio.id = 'anuncio';
        anuncio.classList = 'anuncio';

        anuncio.innerHTML=`    
        <img src="${vivienda.imagen}" alt="#">
        <div class="contenido-anuncio">
            <h3>${vivienda.titulo}</h3>
            <p>${vivienda.descripcion}</p><br><br><br>



            <a href="" class="boton boton-amarillo d-block">Reglamento</a>
            <a href="" class="boton boton-amarillo d-block">Postularme</a>
        </div>`;
        contenedor.appendChild(anuncio);


    });
};

mostrar_anuncio();
