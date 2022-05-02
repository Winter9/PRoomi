const express = require("express")();
const cors = require("cors"); // Nos permitira comunicarnos en nuestra app desde un puerto diferente, otro host
express.use(cors());
const http = require("http").createServer(express);
const io = require("socket.io")(http);
const { MongoClient } = require("mongodb"); //Nos permitira importar todas las dependencias que descargamos


const client = new MongoClient("mongodb+srv://admin:falldevs9@proyectos.4twau.mongodb.net/Roomi?retryWrites=true&w=majority");

 //Le decimos a express que aceptamos connections de diferentes puertos y diferentes hosts

var collection; //Aun cuando definiresmo nuestra coleccion dentro del ListenerStartup, queremos usarlo en cualquier endpoints o Socket connections

io.on("connection", (socket) => {//Con esto, podremos escuchar de otros eventos de ese Socket, cuando se conectan
    socket.on("join", async (vivienda) => { // IDVivienda en vez de gameId. Cuando alguien se une a una determinada vivienda.  Join > Chat > Message
        try {
            console.log("se unio a " + vivienda)
            //let result = await collection.findOne({ "_id": idVivienda }); //O unirse a una vivienda que ya existe o crear un nuevo room.
            //if(!result) {
           //     await collection.insertOne({ "_id": idVivienda, messages: [] });
            //}//Creando el room, si el resultado viene como NO o Undefined. Linea 20, se une al ID particular del momento.
            
            socket.join(vivienda);
            socket.emit("joined", vivienda);//Cuando se una a un chat en el room, dira JOINED
            socket.activeRoom = vivienda;
        } catch (e) {
            console.error(e);
        }
    });
    socket.on("message", (message, user, viv) => { //Cuando alguien envia un mensaje
        console.log("message recive");
        myobj = {mensaje: message, usuario:user, vivienda:viv, fecha: new Date()}
        collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("message added");
          });
        
        io.to(socket.activeRoom).emit("message", message);
    });
});

express.get("/chats", async (request, response) => {
    try {
        let result = await collection.find({ "vivienda": request.query.vivienda}).sort({ fecha: 1 }).toArray() //El Id representa el ID de la vivienda actual, o sea desde el que se realiza la conversacion.
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});
//A continuacion aca es donde estableceremos nuestra conexion con MongoDB. Try, Luego si hay un error, lo tomara Catch
http.listen(3000, async () => {
    try {
        await client.connect();
        collection = client.db("Roomi").collection("chats");
        console.log("Listening on port :%s", http.address().port); //Tomara el Port desde el Listen, o sea el 3000
    } catch (e) {
        console.error(e);
    }
});