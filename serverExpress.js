
// importar express
const express = require("express")

//crear instancia express
const app = express()
const port = 3000;

//se crea en el servidor un arreglo de nombres
const usuarios = {"usuarios": ["tulio", "patana", "juanin", "policarpo", "juan carlos", "sr. manguera", "guaripolo"]};

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
    res.send(usuarios)
  });

  //se crea un middleware para validar que el usuario recibido como parámetro “usuario”
  app.use("/abracadabra/juego/:usuario", (req, res, next) =>{
    const usuarioReq = req.params.usuario

    if (usuarios.usuarios.find(data => data == usuarioReq) ) {
        next()
    } else {
        res.sendFile(__dirname + "/assets/who.jpeg")
    }
})

//ruta GET correspondiente:
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
  });

  //se crea una ruta que valide si el parámetro “n” coincide con el número generado de forma aleatoria
app.get("/abracadabra/conejo/:n", (req, res) => {
    const num = Math.floor(Math.random() * 4) + 1;
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