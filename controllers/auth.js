const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - email'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);
    
    res.json({
      usuario,
      token
    });
  } catch (error) {
    // Error que no ha podido capturarse antes y lleva al catch para no romper la aplicación
    console.log(error);
    res.status(500).json({
      msg: 'ERROR. Comuníquese con el administrador'
    })
  }
  
}


module.exports = {
  login
}