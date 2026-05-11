

require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const proprietari = require('../models/proprietari');

const SALT_ROUND = 12;

// Registrazione sitter
const registra = async ({ nome, cognome, email, password }) => {
const esiste = await proprietari.findByEmail(email);
  if (esiste.rows.length) {
    const err = new Error('Email già presente');
    err.statusCode = 409;
    throw err;
  }

  const hash = await bcrypt.hash(password, SALT_ROUND);

  // ruolo = 'proprietario' è hardcoded: non viene letto dal body
  const result = await proprietari.create({ nome, cognome, email, password: hash, ruolo: 'proprietario' });
  return result.rows[0];
};

// Login
const login = async ({ email, password }) => {
  const result = await proprietari.findByEmail(email);
  const proprietario = result.rows[0];

  // Messaggio vago intenzionale: non rivela se l'email esiste o no
  if (!proprietario) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, proprietario.password);
  if (!match) {
    const err = new Error('Credenziali non valide');
    err.statusCode = 401;
    throw err;
  }

  // FIX #1 — includiamo token_version nel payload JWT.
  // Il middleware autenticato() confronterà questo valore con quello
  // nel DB ad ogni richiesta: se cambiano, il token viene rifiutato.
  const token = jwt.sign(
    {
      id:            proprietario.id,
      email:         proprietario.email,
      ruolo:         proprietario.ruolo,
      tabella:       'proprietari',
      token_version: proprietario.token_version  // ← aggiunto
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

const getAll = async () => {
  const result = await proprietari.findAll();
  return result.rows;
};

const getAnimaliAssegnati = async (id) => {
  const result = await proprietari.getAnimaliAssegnati(id);
  return result.rows;
};

const getById = async (id) => {
  const result = await proprietari.findById(id);
  if (!result.rows.length) {
    const err = new Error('proprietario non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const aggiorna = async (id, dati) => {
  await getById(id);
  const result = await proprietari.update(id, dati);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await proprietari.remove(id);
  // FIX #1 — la riga è stata eliminata: la prossima richiesta
  // con il vecchio JWT non troverà l'proprietario nel DB → 401 automatico.
  return { message: 'proprietario eliminato' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { registra, login, getAll, getById, getAnimaliAssegnati, aggiorna, elimina };
