// ============================================================
// models/proprietari.js — Model della tabella "utenti"
// ============================================================

const pool = require('../config/db');

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS proprietari (
    id            SERIAL        PRIMARY KEY,
    nome          VARCHAR(100)  NOT NULL,
    cognome       VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  UNIQUE NOT NULL,
    password      VARCHAR(255)  NOT NULL,
    token_version INTEGER       NOT NULL DEFAULT 0
  );
`;

const init = () => pool.query(CREATE_TABLE);

// FIX #5 — Le query di lettura non restituiscono MAI la colonna "password".
// Anche se è un hash bcrypt, non deve uscire dalle API.
// L'unica eccezione è findByEmail (usata nel login) che ha bisogno
// dell'hash per confrontarlo con bcrypt.compare().

// Restituisce tutti i sitter (senza password)
const findAll = () =>
  pool.query(
    'SELECT id, nome, cognome, email, token_version FROM proprietari ORDER BY id'
  );

const getAnimaliAssegnati = (id)=>
    pool.query(`
      SELECT *
      FROM animali a
      WHERE a.proprietario_id = $1`,[id]);
       
// Restituisce un singolo sitter per id (senza password)
const findById = (id) =>
  pool.query(
    'SELECT id, nome, cognome, email, token_version FROM proprietari WHERE id = $1',
     [id]
  );

// Restituisce un utente per email — include la password perché serve al login
const findByEmail = (email) =>
  pool.query('SELECT * FROM proprietari WHERE email = $1', [email]);

// Inserisce un nuovo utente.
// RETURNING esclude la password dalla risposta.
const create = ({ nome, cognome, email, password, ruolo = 'utente' }) =>
  pool.query(
    `INSERT INTO proprietari (nome, cognome, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nome, cognome, email`,
    [nome, cognome, email, password]
  );

// Aggiornamento parziale dei campi anagrafici (COALESCE = aggiorna solo i campi inviati)
const update = (id, { nome, cognome, email}) =>
  pool.query(
    `UPDATE proprietari
     SET nome    = COALESCE($1, nome),
         cognome = COALESCE($2, cognome),
         email   = COALESCE($3, email),
         token_version = token_version + 1
     WHERE id = $5
     RETURNING id, nome, cognome, email`,
    [nome, cognome, email, id]
  );

// Aggiorna la password E incrementa token_version.
// FIX #1 — incrementare token_version invalida tutti i JWT emessi
// prima del cambio password: anche se il vecchio token non è ancora scaduto,
// il middleware lo rifiuterà perché il numero non coincide più.
const updatePassword = (id, hashedPassword) =>
  pool.query(
    `UPDATE proprietari
     SET password      = $1,
         token_version = token_version + 1
     WHERE id = $2
     RETURNING id`,
    [hashedPassword, id]
  );

// Elimina un utente per id.
// FIX #1 — non serve aggiornare token_version: la riga sparisce dal DB,
// quindi la query di verifica in autenticato() non troverà nulla
// e restituirà 401 automaticamente.
const remove = (id) =>
  pool.query('DELETE FROM proprietari WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByEmail,getAnimaliAssegnati,
  create, update, updatePassword, remove
};
