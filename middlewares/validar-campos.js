const { validationResult } = require('express-validator');

// se llaman validarCampos en el curso
const errorHandler = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
}


module.exports = {
  errorHandler
};