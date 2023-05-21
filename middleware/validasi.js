const { check, validationResult } = require('express-validator');

exports.validateCreateMovie = [
  check('title').notEmpty().withMessage('Title tidak boleh kosong'),
  check('description').notEmpty().withMessage('Description tidak boleh kosong'),
  check('rating')
    .notEmpty().withMessage('Rating tidak boleh kosong')
    .isFloat().withMessage('Rating must be a valid number'),
  check('userId').notEmpty().withMessage('User ID tidak boleh kosong'),
]

exports.validateUpdateMovie = [
  check('title').notEmpty().withMessage('Title tidak boleh kosong'),
  check('description').notEmpty().withMessage('Description tidak boleh kosong'),
  check('rating')
    .notEmpty().withMessage('Rating tidak boleh kosong')
    .isFloat().withMessage('Rating must be a valid number'),
  check('userId').notEmpty().withMessage('User ID tidak boleh kosong'),
  check('image').notEmpty().withMessage('Image tidak boleh kosong')
]

exports.validateLogin = [
  check('username').notEmpty().withMessage('Username tidak boleh kosong'),
  check('password').notEmpty().withMessage('Password tidak boleh kosong'),
]

exports.validateDetailDeleteMovie = [
  check('id')
    .notEmpty().withMessage('Movie ID tidak boleh kosong')
    .isInt().withMessage('Movie ID must be a valid number'),
]

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: errors.array(),
    })
  }
  next()
}
