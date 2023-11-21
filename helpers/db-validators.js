const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRoleValid = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${ role } no está registrado en la BD`);
  }
};

const isEmailUnique = async (email = '') => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${ email } ya está registrado`);
  }
}

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`No existe usuario con id: ${ id }`);
  }
}

module.exports = {
  isRoleValid,
  isEmailUnique,
  existeUsuarioPorId
};