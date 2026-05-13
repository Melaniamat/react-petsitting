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

const me = async (req, res) => {
    const authHeader = req.headers.authorization;
   // res.status(200).json({h: req.headers });

    try {
        
        const data = await authService.me(authHeader);
        
        res.status(200).json(data); 
    } catch (err) {
        // Gestione degli errori in base al tipo (401 per auth, 404 per non trovato)
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ errore: err.message });
    }
        
  };

module.exports={login,registra, me}