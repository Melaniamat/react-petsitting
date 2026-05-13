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

  // Messaggio vago intenzionale: non rivela se l'email esiste o no
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

  return token;
};

async function me(token) {
  if (!token) {
    const error = new Error('Token mancante');
    error.statusCode = 401;
    throw error;
  }

  const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  const payload = jwt.verify(cleanToken, SECRET);
  const result = await userModel.findById(payload.userId);

  try {

    if (result.rows.length === 0) {
      const error = new Error('user non trovato');
      error.statusCode = 404;
      throw error;
    }

    return {
      user: result.rows[0]
    }
  } catch (err) {
    const error = new Error('Token non valido');
    error.statusCode = 401;
    throw error;


  }
}

  module.exports = { register, login, me }