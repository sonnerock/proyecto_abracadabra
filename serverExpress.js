
// importar express
const express = require("express")

//crear instancia express
const app = express()
const port = 3000;

//se crea en el servidor un arreglo de nombres
const usuarios = ["Tulio", "Patana", "Juanin", "Policarpo", "Juan Carlos", "Sr. Manguera", "Guaripolo"];

//escuchar conexion al puerto 3000
app.listen(port, ()=>{
    console.log("El servidor esta iniciado en el puerto 3000")
})

//Ruta al contenido publico
app.use(express.static("./assets"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//se devuelve el arreglo de usuarios en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
    const registros = { usuarios };
    res.send(JSON.stringify(registros));
  });

  //se crea un middleware para validar que el usuario recibido como parámetro “usuario”
  app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const nombreUsuario = req.params.usuario;
    const isUser = usuarios.map((usuarios) => usuarios.toLowerCase()).includes(nombreUsuario.toLowerCase());
  isUser ? next() : res.sendFile(__dirname + "/assets/who.jpeg");
});

//ruta GET correspondiente:
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
  });

  //se crea una ruta que valide si el parámetro “n” coincide con el número generado de forma aleatoria
app.get("/abracadabra/conejo/:n", (req, res) => {
    const num = Math.floor(Math.random() * (5 - 1)) + 1;
    const n = req.params.n;

  
    if (num == n) {
      //en caso de ser exitoso, devolver la imagen del conejo
      res.sendFile(__dirname + "/assets/conejito.jpg");
    } else {
      //de lo contrario devolver la imagen de Voldemort
      res.sendFile(__dirname + "/assets/voldemort.jpg");
    }
});

//se crea una ruta genérica al consultar una ruta que no esté definida en el servidor
app.get("*", (req, res) => {
    res.send("<center><h1>“Esta página no existe...”</h1> </center>");
});