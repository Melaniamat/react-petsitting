require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      ruolo: user.ruolo,
      token_version: user.token_version
    },
    SECRET,
    { expiresIn: '1h' }
  );
}


// Registrazione user
async function register({ nome, cognome, email, password, ruolo }) {
  const esiste = await userModel.findByEmail(email);
  if (esiste.rows.length > 0) {
    const err = new Error('Email già presente');
    err.statusCode = 409;
    throw err;
  }
  const hash = await bcrypt.hash(password, 12);
  const result = await userModel.create({ nome, cognome, email, password: hash, ruolo });
  return result.rows[0];
};

// Login
async function login({ email, password }) {
  const result = await userModel.findByEmail(email);
  const user = result.rows[0];
  if (!user) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }
  const token = generateToken(user)
  const { password: _, ...utenteSenzaPassword } = user
  return { token , utente: utenteSenzaPassword }
};

async function me(token) {
  if (!token) {
    const error = new Error('Token mancante');
    error.statusCode = 401;
    throw error;
  }

  const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  try {
    const payload = jwt.verify(cleanToken, SECRET); // ora è dentro il try
    const result = await userModel.findById(payload.userId);

    if (result.rows.length === 0) {
      const error = new Error('Utente non trovato');
      error.statusCode = 404;
      throw error;
    }

    return { user: result.rows[0] };

  } catch (err) {
    // Rilancia gli errori già strutturati (404, ecc.)
    if (err.statusCode) throw err;

    // Errori JWT (TokenExpiredError, JsonWebTokenError, ecc.)
    const error = new Error('Token non valido');
    error.statusCode = 401;
    throw error;
  }
}

  module.exports = { register, login, me }