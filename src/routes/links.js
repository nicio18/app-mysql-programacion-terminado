//Guardar un enlace, eliminarlo, 
const express= require("express");
const router =express.Router();
const pool = require("../database");
const {isLoggedIn} = require('../lib/auth')

router.get("/add",isLoggedIn, (req, res)=>{
   res.render("links/add.hbs");
});
//Encargado de recibir los datos del formulario 
router.post("/add",isLoggedIn,  async(req, res)=>{
   const {title, url, description} =req.body;
   const newLink = {
      title,
      url,
      description
   };
   //pool es nuestra conexion
   
      await pool.query("INSERT INTO links set ? ",[newLink]);
      // flash recibe dos parametros 1, el nombre como se guarda el mensaje, y el valor de el mensaje
      req.flash('success', 'Link saved succefully');
      //redirecciona a la ruta links una vez que se guarda un link
      res.redirect('/links')
})

//listar tareas mediante el metodo get.
router.get('/', isLoggedIn, async (req, res)=>{
   const links = await pool.query('SELECT * FROM links')
   //renderizamos las listas mediante...
   res.render('links/list', { links })
})

router.get('/delete/:id',isLoggedIn, async (req, res) => {
   const { id } = req.params;
   await pool.query('DELETE * FROM links WHERE id = ?', [id]);
   req.flash('success', ' Link Removed Successfully')
   //redireccionamos a la ruta 
   res.redirect('/links');
});

router.get('edit/:id',isLoggedIn, async (req, res)=>{
   const {id} = req.params;
   const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
   res.render('links/edit', {link:links[0]})
})

//ingresamos los datos editados mediante el metodo post
router.post('/edit/:id',isLoggedIn, async (req, res) => {
   const { id } = req.params;
   const { title, description, url} = req.body; 
   const newLink = {
       title,
       description,
       url
   };
   //almacenamos en la base de datos los datos actualizados.
   await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);

   req.flash('success', 'Link Updated Successfully');
   req.flash('success', 'Link Updated succesfully')
   //redireccionamos 
   res.redirect('/links');
});


module.exports= router;
