const controller = require('../controller/auth.controller');
const router     = require('express').Router();
const { body, param } = require('express-validator');
const validate   = require('../middleware/validate');

const limiter    = require('express-rate-limit');

// Rate limiter specifico per login e registrazione:
// max 10 tentativi al minuto per IP → rallenta i brute-force
const limiterAuth = limiter({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { successo: false, errore: 'Troppi tentativi, riprova tra qualche minuto' }
});


// ── Regole di validazione ─────────────────────────────────────

const regolaRegistra = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Il nome è obbligatorio')
    .isLength({ max: 100 }).withMessage('Il nome non può superare 100 caratteri'),

  body('cognome')
    .trim()
    .notEmpty().withMessage('Il cognome è obbligatorio')
    .isLength({ max: 255 }).withMessage('Il cognome non può superare 255 caratteri'),

  body('email')
    .trim().toLowerCase()
    .notEmpty().withMessage('L\'email è obbligatoria')
    .isEmail().withMessage('Formato email non valido'),

  body('password').notEmpty().withMessage('La password è obbligatoria'),
  body('password').isLength({ min: 8 }).withMessage('La password deve avere almeno 8 caratteri'),
  body('password').isLength({ max: 100 }).withMessage('La password non può superare 100 caratteri'),
  body('password').custom(v => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])/.test(v))
      throw new Error('La password deve contenere almeno una maiuscola, una minuscola, un numero e un carattere speciale');
    return true;
  }),
];

const regolaLogin = [
  body('email')
    .trim().toLowerCase()
    .notEmpty().withMessage('L\'email è obbligatoria')
    .isEmail().withMessage('Formato email non valido'),

  body('password')
    .notEmpty().withMessage('La password è obbligatoria'),
];

// ── Route pubbliche (senza autenticazione) ────────────────────
router.post('/registra', limiterAuth, regolaRegistra, validate, controller.registra);
router.post('/login',    limiterAuth, regolaLogin,    validate, controller.login);
router.get('/me',controller.me)

module.exports = router;