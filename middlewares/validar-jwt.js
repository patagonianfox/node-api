//#region IMPORTS
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const { Error } = require('mongoose');
//#endregion

const validarJWT = async ( req = request, res = response, next ) => {

  /** 
   * Alternativa con AUTHORIZATION - BEARER TOKEN
	 * Ver https://medium.com/ms-club-of-sliit/jwt-bearer-token-authentication-for-express-js-5e95bf4dead0
   */
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else {
    return res.sendStatus(403);
  }

	/**
	 * Alternativa del curso con un Header personalizado 'x-token'
	 */
  // const token = req.header('x-token');

  // if (!token) {
  //   return res.status(401).json({
  //     msg: 'No hay token en la petición'
  //   });
  // }

  try {
    const { uid } = jwt.verify(req.token, process.env.SECRET_KEY);
    // Lee el usuario que corresponde al uid utilizando Mongoose
    const usuario = await Usuario.findById(uid);
    // Verifica que el usuario exista
    if (!usuario)
      throw Error('Token no válido - Usuario inexistente en DB');
    // Verfica que el usuario esté activo
    if (!usuario.estado)
      throw Error('Token no válido - Usuario inactivo');
    req.usuario = usuario;
    next();
  }
  catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    })
  }

}


module.exports = {
  validarJWT
}