//Creamos todas las rutas que va a tener nuesto sitio, como pagina principal, contacto, etc.
const express=require("express");

//express.Router crea un objeto el cual se guarda en la constante routter.
const router = express.Router();

//definir una ruta, la barra significa inicial.
router.get('/', async (req, res) => {
    res.render('index');
});


//Exportamos la ruta
module.exports = router;