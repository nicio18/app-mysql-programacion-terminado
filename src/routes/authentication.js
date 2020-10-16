const express = require('express');
const router = express.Router();

const passport = require('passport')


const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Ruta signup
router.get('/signup',isNotLoggedIn, (req, res) => {
  //rederizamos la ruta signup
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  //redireccionamiento cuando va todo bien,
  successRedirect: '/profile',
  //redireccionamiento cuando falle.
  failureRedirect: '/signup',
  //permite recibir a passport mensajes flash, los cuales creamos antes
  failureFlash: true
}));

// Ruta singin
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

//Logout 
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

//autenticamos con isLoggedIn, protegiendo la ruta.
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;
