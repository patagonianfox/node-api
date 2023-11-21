const { Router } = require('express');
const { check } = require('express-validator');

const { errorHandler }  = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');

const router = Router();

// HTTP POST
router.post('/login', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  errorHandler
], login);


module.exports = router;