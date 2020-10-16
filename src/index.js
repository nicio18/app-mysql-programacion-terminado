//ARCHIVO QUE ARRANCA TODA LA APLICACION //
const express= require("express");
const morgan = require("morgan");
const handlerbar =require("express-handlebars");
const path = require("path");
const flash = require('connect-flash')
//session almacena 
const session =require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport');

const {database} = require('./keys');


//initialization 
const app = express();

// para que la aplicacion se entere el metodo de autenticacion que estamos creando.
require('./lib/passport')

//setting
//definir puerto de sistema si no hay usar, el puerto 4000
app.set("port", 4000);
//__dirname, devuelve la direccion del archivo que se esta ejecutando.
//extname configura la extension de los archivos handlerbar
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",handlerbar({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.set("views"), "partials"), 
    extname: ".hbs",
    helpers: require("./lib/handlerbar")
}));
//se configura el motor hbs
app.set("views engine", ".hbs");


//Middlewares: son funciones que se ejecutan cada vez que un cliente envia una peticion al servidor.
app.use(session({
    secret: 'proyectoProgramacion',
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

app.use(flash());

app.use(morgan("dev"));
//app.use(express.urlencoded({extended: false})) ----> sirve para poder aceptar los datos de los usuarios
app.use(express.urlencoded({extended: false}));

//
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session())



//Global Variables
//req: request--solicitud, res: respuesta, next: toma la informacion del usuario lo que el servidor quiere responder y continua con el codigo
app.use((req, res, next)=>{
    //hacemos disponible el mensaje flash desde todas las visas
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    //hacemos publico el usuario en las vistas mediante la sesionn, ahora puede ser accedidA de cualquier vista
    app.locals.user=req.user;
    next();

});

//Routes
app.use(require("./routes/"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting the server
app.listen(app.get("port"),()=>{
    console.log("Server on port", app.get("port"));
});