const express = require("express");
const app = express()
const cors = require("cors"); 
const http = require("http").createServer(app);
var fs = require('fs');


var corsOptions = {
    origin: '*',
  }


app.use(cors(corsOptions)); //Le decimos a express que aceptamos connections de diferentes puertos y diferentes hosts

app.get("/", async (request, response) => {
    try {
        console.log(request.params.vivienda)
        var file = fs.readFileSync('../public/Vivienda/chat.html', {encoding: 'utf8'});
        response.send(file);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

app.use(express.static('../public/Vivienda'))

//A continuacion aca es donde estableceremos nuestra conexion con MongoDB. Try, Luego si hay un error, lo tomara Catch
http.listen(80, async () => {
    try {
        console.log("Listening on port :%s", http.address().port); //Tomara el Port desde el Listen, o sea el 3000
    } catch (e) {
        console.error(e);
    }
});




