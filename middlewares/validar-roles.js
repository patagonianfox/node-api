const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {

  if (!req.usuario) {
    res.status(500).json('Error de sistema - Contacte al administrador');
    throw Error('Se quiere verificar el role sin validar el token primero');
  }

  const { role, nombre } = req.usuario;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No está autorizado a hacer esta acción`
    });
  }
  
  next();
}

const hasRole = ( ...roles ) => {
  return (req, res, next) => {

    if (!req.usuario) {
      res.status(500).json('Error de sistema - Contacte al administrador');
      throw Error('Se quiere verificar el role sin validar el token primero');
    }

    const { role, nombre } = req.usuario;
    const existeRole = roles.includes(role);
    if (!existeRole) {
      res.status(401).json({
        msg: "Este usuario no está autorizado a realizar esta acción."
      });
      throw Error(`Usuario no autorizado: ${nombre} con rol ${role}. Se requiere alguno de estos roles: ${roles}`);
    }
    next();
  }
}

module.exports = { isAdminRole, hasRole };