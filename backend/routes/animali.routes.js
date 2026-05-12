const router = require('express').Router();
const { body, param } = require('express-validator');
const validate   = require('../middleware/validate');
const controller = require('../controller/animali.controller');
const { autenticato, soloAdmin, soloProprietari, soloSéOAdmin } = require('../middleware/auth');

const regolaId = [
  param('id').isInt({ min: 1 }).withMessage('Il id deve essere un numero intero positivo'),
];

const regolaCrea = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Il nome è obbligatorio')
    .isLength({ max: 255 }).withMessage('Il nome non può superare 255 caratteri'),

  body('tipo')
    .trim()
    .notEmpty().withMessage('Il tipo è obbligatorio')
    .isLength({ max: 255 }).withMessage('Il tipo non può superare 255 caratteri'),

  

  body('note')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Le note non possono superare 255 caratteri')
];

const regolaAggiorna = [
  param('id').isInt({ min: 1 }).withMessage('Il id deve essere un numero intero positivo'),

  body('nome')
    .optional()
    .trim()
    .notEmpty().withMessage('Il nome non può essere vuoto')
    .isLength({ max: 255 }).withMessage('Il nome non può superare 255 caratteri'),

  body('tipo')
    .optional()
    .trim()
    .notEmpty().withMessage('Il tipo non può essere vuoto')
    .isLength({ max: 255 }).withMessage('Il tipo non può superare 255 caratteri'),


  body('note')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Le note non possono superare 255 caratteri'),
];

// Tutte le routes
router.post('/', autenticato, soloSéOAdmin, regolaCrea, validate, controller.crea);
router.get('/', autenticato, controller.getAll);
router.get('/:id', autenticato, regolaId, validate, controller.getById);
router.patch('/:id', autenticato,soloSéOAdmin, regolaAggiorna, validate, controller.aggiorna);
router.delete('/:id', autenticato, soloSéOAdmin, regolaId, validate, controller.elimina);

module.exports = router;