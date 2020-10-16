//Lo llamamos asi porque podemos poner muchas funciones entre ellas bcryptjs.
const bcrypt = require('bcryptjs');


const helpers = {};

//cifrar contraseña.
helpers.encryptPassword = async (password) => {
  //gen es para crear un algoritmo de cifrado. 10 es lo comun.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
//Comparacion de contraseñas cifrada con la ingresada.
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
