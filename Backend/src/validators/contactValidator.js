const { body, validationResult } = require('express-validator');

const validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Valid email is required'),

  body('subject')
    .notEmpty()
    .withMessage('Subject is required'),

  body('message')
    .notEmpty()
    .withMessage('Message is required')
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = { validateContact, checkValidation };
