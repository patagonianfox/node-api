
const { Schema, model } = require('mongoose');
const role = require('./role');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña obligatoria']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}


module.exports = model('Usuario', UsuarioSchema);