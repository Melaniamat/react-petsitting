// ============================================================
// routes/prestiti.routes.js
// ============================================================

const router     = require('express').Router();
const { body, param } = require('express-validator');
const validate   = require('../middleware/validate');
const controller = require('../controller/appuntamenti.controller');
const { autenticato, soloAdmin, soloSitter,soloProprietari, soloSéOAdmin } = require('../middleware/auth');

const regolaId = [
  param('id').isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),
];

const regolaCrea = [
  // FIX #4 — utente_id rimosso dalla validazione del body:
  // viene letto direttamente dal JWT nel controller (req.utente.id).
  // Anche se il client lo invia, il controller lo ignora.

  body('animale_id')
    .notEmpty().withMessage('L\'animale_id è obbligatorio')
    .isInt({ min: 1 }).withMessage('animale_id deve essere un numero intero positivo'),

  
    
    
];

// Tutte le routes
router.post('/',                 autenticato, regolaCrea,soloSitter, soloSéOAdmin, validate, controller.crea);
router.get('/',                  autenticato, soloAdmin,soloSitter, controller.getAll);
router.get('/:stato',            autenticato, soloSitter,soloAdmin,controller.getAllByStato);
router.get('/:id',               autenticato, soloSitter,regolaId, validate, controller.getById);
router.patch('/:id',             autenticato, soloSitter, soloSéOAdmin,regolaId, validate, controller.getById);
router.patch('/:id/annulla',     autenticato, soloSitter, soloSéOAdmin,regolaId, validate, controller.annulla);
router.delete('/:id',            autenticato, soloSitter, soloAdmin, regolaId, validate, controller.elimina);

module.exports = router;
