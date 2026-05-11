// ============================================================
// services/utenti.service.js — Logica di business per gli utenti
// ============================================================

require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const sitterModel = require('../models/sitters');

const SALT_ROUND = 12;

// Registrazione sitter
const registra = async ({ nome, cognome, email, password }) => {
const esiste = await sitterModel.findByEmail(email);
  if (esiste.rows.length) {
    const err = new Error('Email già presente');
    err.statusCode = 409;
    throw err;
  }

  const hash   = await bcrypt.hash(password, SALT_ROUND);

  // ruolo = 'utente' è hardcoded: non viene letto dal body
  const result = await sitterModel.create({ nome, cognome, email, password: hash, ruolo: 'utente' });
  return result.rows[0];
};

// Login
const login = async ({ email, password }) => {
  const result = await sitterModel.findByEmail(email);
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

  // FIX #1 — includiamo token_version nel payload JWT.
  // Il middleware autenticato() confronterà questo valore con quello
  // nel DB ad ogni richiesta: se cambiano, il token viene rifiutato.
  const token = jwt.sign(
    {
      id:            utente.id,
      email:         utente.email,
      ruolo:         utente.ruolo,
      tabella:       'sitters',
      token_version: utente.token_version  // ← aggiunto
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

const getAll = async () => {
  const result = await sitterModel.findAll();
  return result.rows;
};

const getAnimaliAssegnati = async () => {
  const result = await sitterModel.getAnimaliAssegnati;
  return result.rows;
};

const getAppuntamenti= async() => {
  const result= await sitterModel.getAppuntamenti;
  return result.rows;
}

const getById = async (id) => {
  const result = await sitterModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Utente non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const aggiorna = async (id, dati) => {
  await getById(id);
  const result = await sitterModel.update(id, dati);
  return result.rows[0];
};

const aggiornaStato = async (id, dati) => {
  await getById(id);
  const result = await sitterModel.updateStato(id);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await sitterModel.remove(id);
  // FIX #1 — la riga è stata eliminata: la prossima richiesta
  // con il vecchio JWT non troverà l'utente nel DB → 401 automatico.
  return { message: 'Utente eliminato' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { registra, login, getAll, getById,getAnimaliAssegnati,getAppuntamenti, aggiorna, elimina };
