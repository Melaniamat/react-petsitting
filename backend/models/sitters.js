// ============================================================
// models/utenti.js — Model della tabella "utenti"
// ============================================================

const pool = require('../config/db');

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS sitters (
    id            SERIAL        PRIMARY KEY,
    nome          VARCHAR(100)  NOT NULL,
    cognome       VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  UNIQUE NOT NULL,
    password      VARCHAR(255)  NOT NULL,
    ruolo         VARCHAR(20)   NOT NULL DEFAULT 'utente'
                  CHECK (ruolo IN ('admin', 'utente')),
    stato                       VARCHAR(20) NOT NULL DEFAULT 'abilitato'
    CHECK (stato IN ('abilitato', 'disabilitato')),
    token_version INTEGER       NOT NULL DEFAULT 0
  );
`;

const init = () => pool.query(CREATE_TABLE);

// Restituisce tutti gli utenti (senza password)
const findAll = () =>
  pool.query(
    'SELECT id, nome, cognome, email, ruolo, stato, token_version FROM sitters ORDER BY id'
  );

// Restituisce un singolo utente per id (senza password)
const findById = (id) =>
  pool.query(
    'SELECT id, nome, cognome, email, ruolo, stato, token_version FROM sitters WHERE id = $1',
    [id]
  );

// Restituisce un utente per email — include la password perché serve al login
const findByEmail = (email) =>
  pool.query('SELECT * FROM sitters WHERE email = $1', [email]);

// Inserisce un nuovo utente.
// RETURNING esclude la password dalla risposta.
const create = ({ nome, cognome, email, password, ruolo = 'utente' , stato ='abilitato'}) =>
  pool.query(
    `INSERT INTO sitters (nome, cognome, email, password, ruolo, stato)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, nome, cognome, email, ruolo, stato`,
    [nome, cognome, email, password, ruolo, stato]
  );

// Aggiornamento parziale dei campi anagrafici (COALESCE = aggiorna solo i campi inviati)
const update = (id, { nome, cognome, email, ruolo, stato }) =>
  pool.query(
    `UPDATE sitters
     SET nome    = COALESCE($1, nome),
         cognome = COALESCE($2, cognome),
         email   = COALESCE($3, email),
         ruolo   = COALESCE($4, ruolo),
         token_version = token_version + 1
         ruolo   = COALESCE($6, stato)
     WHERE id = $5
     RETURNING id, nome, cognome, email, ruolo, stato`,
    [nome, cognome, email, ruolo, id, stato]
  );

//aggiorna stato sitter, solo per admin
  const updateStato = (id) =>
  pool.query(`
    UPDATE sitters
    SET stato = 'disabilitato'
    WHERE id = $1
    RETURNING *
    `,[id]
  );

  const getAppuntamenti = (id)=>
    pool.query(`
      SELECT 
      a.*, 
      p.nome AS nome_proprietario, 
      p.cognome AS cognome_proprietario,
      an.nome AS nome_animale
      an.tipo AS tipo
      FROM appuntamenti a
      JOIN animali an ON a.animale_id = an.id
      JOIN proprietari p ON an.proprietario_id = p.id
      WHERE a.sitter_id = $1
  `,[id]);

  const getAnimaliAssegnati = (id)=>
    pool.query(`
    SELECT 
    p.nome AS nome_proprietario, 
    p.cognome AS cognome_proprietario, 
    p.email AS email_proprietario,
    a.nome AS nome_animale,
    app.data_appuntamento,
    app.stato
    FROM appuntamenti app
    JOIN animali a ON app.animale_id = a.id
    JOIN proprietari p ON a.proprietario_id = p.id
    WHERE app.sitter_id = $1; `,[id]);

// Aggiorna la password E incrementa token_version.
// FIX #1 — incrementare token_version invalida tutti i JWT emessi
// prima del cambio password: anche se il vecchio token non è ancora scaduto,
// il middleware lo rifiuterà perché il numero non coincide più.
const updatePassword = (id, hashedPassword) =>
  pool.query(
    `UPDATE sitters
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
  pool.query('DELETE FROM sitters WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByEmail,
  create, update, updatePassword, updateStato,getAppuntamenti,getAnimaliAssegnati,remove
};
