// ============================================================
// routes/utenti.routes.js — Route per utenti e autenticazione
// ============================================================

const router     = require('express').Router();
const { body, param } = require('express-validator');
const validate   = require('../middleware/validate');
const controller = require('../controller/users.controller');
const { autenticato, soloAdmin, soloSéOAdmin } = require('../middleware/auth');
const limiter    = require('express-rate-limit');



const regolaId = [
  param('id').isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),
];

const regolaAggiorna = [
  param('id').isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),

  body('nome')
    .optional().trim()
    .notEmpty().withMessage('Il nome non può essere vuoto')
    .isLength({ max: 100 }).withMessage('Il nome non può superare 100 caratteri'),

  body('cognome')
    .optional().trim()
    .notEmpty().withMessage('Il cognome non può essere vuoto')
    .isLength({ max: 255 }).withMessage('Il cognome non può superare 255 caratteri'),

  body('email')
    .optional().trim().toLowerCase()
    .isEmail().withMessage('Formato email non valido'),

  body('ruolo')
    .optional()
    .isIn(['utente']).withMessage('Il ruolo non puo essere cambiato'),
];

const regolaPromuovi = [
  param('id').isInt({ min: 1 }).withMessage('L\'id deve essere un numero intero positivo'),

  body('nome')
    .optional().trim()
    .notEmpty().withMessage('Il nome non può essere vuoto')
    .isLength({ max: 100 }).withMessage('Il nome non può superare 100 caratteri'),

  body('cognome')
    .optional().trim()
    .notEmpty().withMessage('Il cognome non può essere vuoto')
    .isLength({ max: 255 }).withMessage('Il cognome non può superare 255 caratteri'),

  body('email')
    .optional().trim().toLowerCase()
    .isEmail().withMessage('Formato email non valido'),

  body('ruolo')
    .optional()
    .isIn(['admin']).withMessage('Il ruolo non puo essere diverso da admin per la promozione'),
];



// ── Route protette ────────────────────────────────────────────

// Solo admin può vedere la lista completa degli utenti
router.get('/', autenticato,controller.getAll);

// FIX #6 — solo se Admin: solo l'utente stesso o un admin
// può leggere i dati di un profilo
router.get('/:id', autenticato, soloSéOAdmin, regolaId, validate, controller.getById);

router.get('/:id/animali', autenticato, soloSéOAdmin, regolaId, validate, controller.getAnimali);

router.get('/:id/appuntamenti', autenticato, soloSéOAdmin, regolaId, validate, controller.getAppuntamenti);

// FIX #3 — solo se Admin: solo l'utente stesso o un admin
// può modificare un profilo
router.patch('/:id', autenticato, soloSéOAdmin, regolaAggiorna, validate, controller.aggiorna);

//aggiorna stato sitter(solo Admin)
router.patch('/:id/stato' , autenticato, soloAdmin, regolaId, validate, controller.aggiornaStato)


// Solo admin può eliminare un utente
router.delete('/:id',  regolaId, validate, controller.elimina);

// ── Esportazione ──────────────────────────────────────────────
module.exports = router;
