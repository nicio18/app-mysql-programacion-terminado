const passport = require('passport');

// permite configurar el metodo de autenticacion, en este caso seria local.
const LocalStrategy = require('passport-local').Strategy;
//importamos la conexion.
const pool = require('../database');
const helpers = require('./helpers');

//
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  //configuracion para recibir mas datos ademas de usernameFiel y passwordField
  passReqToCallback: true
  //done continua el proceso.
}, async (req, username, password, done) => {
  //consulta a la base de datos si existe el usuario.
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  //validacion.
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  //
  newUser.password = await helpers.encryptPassword(password);
  // Guardando en la base de datos.
  const result = await pool.query('INSERT INTO users SET ? ', [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

// configuracion de passport, toma el usuario y guarda en una session 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//
passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  //ponemos indice 0 porque devuelve un objeto y usamos el primero.
  done(null, rows[0]);
});

