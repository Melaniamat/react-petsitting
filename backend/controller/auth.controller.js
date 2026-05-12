const authService = require('../services/auth.service')



// POST /registra
const registra = async (req, res, next) => {
  try {
    const utente = await authService.register(req.body);
    res.status(201).json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.json({ successo: true, dati: token });
  } catch (err) { next(err); }
};

module.exports={login,registra}