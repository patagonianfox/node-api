
const { Router } = require('express');
const { check } = require('express-validator');

const { errorHandler, validarJWT, hasRole, isAdminRole } = require('../middlewares');

const { isRoleValid, isEmailUnique, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

// HTTP GET
router.get('/', usuariosGet);

// HTTP POST
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener más de 6 letras').isLength({ min: 6 }),
  check('email', 'El email no es válido').isEmail(),
  check('email').custom(isEmailUnique),
  check('role').custom(isRoleValid),
  errorHandler
], usuariosPost);

// HTTP PUT
router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('role').custom(isRoleValid),
  errorHandler
], usuariosPut);

// HTTP DELETE
router.delete('/:id', [
  validarJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  errorHandler
], usuariosDelete);


module.exports = router;