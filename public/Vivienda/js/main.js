'use strict';
const popup = document.querySelector('.chat-popup'); // Tiene la clase de chat-popup
const chatBtn = document.querySelector('.chat-btn'); // Para que al usuario cuando clickee o no el boton para el chat, sea interactivo
const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chat-area'); //Un holder para el chat
const inputElm = document.querySelector('#chatInput'); //Un holder para el box donde se escribe el texto
const emojiBtn = document.querySelector('#emoji-btn'); // El ID es arastrado del html del ID del boton del emoji, y se copia identico, luego del simbolo numerico. El nombre de la constante era button que era muy global, cambio a emojiBtn para diferenciarlo
const picker = new EmojiButton();
const socket = io("http://localhost:3000", {autoConnect: true,transports: ["websocket"]})

// Escogencia del Emoji. Funcion.  
window.addEventListener('DOMContentLoaded', () => { //cuando la ventana es cargada, DOMContentLoaded es cargado

    picker.on('emoji', emoji => { // El event listener para el evento llamamo Emoji para introducirlo dentro del evento INPUT (En texto, para permitirlo como texto en el chat) que y con el += agregar el emoji a el evento input
      document.querySelector('input').value += emoji;
    });
  
    emojiBtn.addEventListener('click', () => { // Es un click event listener, donde al clickearlo, permite escoger emojis del Toggle picker (Donde antes habia un evento llamado Button que paso a llamarse emojiBtn como la constante que fue validada)
      picker.togglePicker(emojiBtn);
    });

    //chat socket logic
    socket.connect();

    socket.on("connect", async () => {
      socket.emit("join", "4");
    });

    socket.on("joined", async (vivienda) =>{
      let result = await fetch('http://localhost:3000/chats?vivienda=4')
      .then(responce => responce.json());
      if(result.length > 0){
        result.forEach(element => {
          let temp = `<div class="out-msg">
          <span class="my-msg">${element.mensaje}</span>
          <img src="img/me.jpg" class="avatar">
          </div>`;
          //a continuacion, 
          chatArea.insertAdjacentHTML("beforeend", temp)
        });
      }      
    })



    socket.on("message",(message)=>{
      let temp = `<div class="out-msg">
          <span class="my-msg">${message}</span>
          <img src="img/me.jpg" class="avatar">
          </div>`;
          //a continuacion, 
          chatArea.insertAdjacentHTML("beforeend", temp)
    })

    

  });
  
  // chat button taggler

  chatBtn.addEventListener('click', ()=>{ // el evento es que cuando el boton sea presionado, corra una funcion.
    popup.classList.toggle('show'); // Una vez presionado, desencadenara la clase creada en css llamada show, para que muestre el chat
})

// Para enviar el mensaje 
submitBtn.addEventListener('click', ()=>{ // Al darle click a este evento, retorna el valor, que es input del usuario pero en la pantalla del chat
  let userInput = inputElm.value; //Con click dejara que el UserInput
  // La clase a continuacion es Output message, para poder enviar y recibir mensajes y que queden guardados en la sesion activa. La linea siguiente es para colocar la imagen que seria la mia o Me, y la clase es avatar. Este es una una locacion temporal para sostener el template, no con usuarios quemados.
  /*let temp = `<div class="out-msg">
  <span class="my-msg">${userInput}</span>
  <img src="img/me.jpg" class="avatar">
  </div>`;
  //a continuacion, */
  socket.emit("message",userInput,"2","4" )
  //chatArea.insertAdjacentHTML("beforeend", temp);
  inputElm.value = '';
  //linea anterior es con valor '' vacio, para que al enviar el texto al chat, se quede vacia la barra de texto donde se escribio.
})
