require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const userModel = require('../models/users');

const SECRET = process.env.JWT_SECRET;

function generateToken(user){
    return jwt.sign(
    {
      userId:            utente.id,
      email:         utente.email,
      ruolo:         utente.ruolo,
      token_version: utente.token_version  
    },
    SECRET,
    { expiresIn: '1h' }
  );
}


// Registrazione utente
async function register({ nome, cognome, email, password, ruolo }){
    const esiste = await userModel.findByEmail(email);
    if (esiste.rows.length > 0) {
        const err = new Error('Email già presente');
        err.statusCode = 409;
        throw err;
}
  const hash   = await bcrypt.hash(password, 12);
  const result = await userModel.create({ nome, cognome, email, password: hash, ruolo });
  return result.rows[0];
};

// Login
async function login({ email, password }){
  const result = await userModel.findByEmail(email);
  const utente = result.rows[0];

  // Messaggio vago intenzionale: non rivela se l'email esiste o no
  if (!utente) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, utente.password);
  if (!match) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(utente)

  return token;
};

async function me(token){
    if(!token){
        const error = new Error('Token mancante');
        error.statusCode = 401;
        throw error;
    }

    const payload = jwt.verify(token, SECRET);
    const result = await userModel.findById(payload.userId);
    if(result.rows.length === 0){
        const error = new Error('Utente non trovato');
        error.statusCode = 404;
        throw error;
    }

    return {
        user: result.rows[0]
    }
}

module.exports = { register, login, me }