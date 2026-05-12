// ============================================================
// models/u.js — Model della tabella "libri"
//
// Il model si occupa SOLO di comunicare con il database.
// Nessuna logica di business qui: solo query SQL.
// La logica (es. "il libro è disponibile?") appartiene al service.
// ============================================================

const pool = require('../config/db');

// ── Creazione tabella ─────────────────────────────────────────
// Eseguita una volta sola all'avvio (vedi index.js → start()).
// IF NOT EXISTS evita errori se la tabella esiste già.
// quantita CHECK >= 0 impedisce valori negativi a livello database.
// disponibile indica se almeno una copia è disponibile per il prestito.
const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS animali (
    id                  SERIAL       PRIMARY KEY,
    nome                VARCHAR(255) NOT NULL,
    tipo                VARCHAR(255) NOT NULL,
    proprietario_id     INTEGER      NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    note                TEXT
    
  );
`;

const init = () => pool.query(CREATE_TABLE);

// ── Query di lettura ──────────────────────────────────────────

// Restituisce tutti i libri in ordine alfabetico per titolo
const findAll = () =>
  pool.query('SELECT * FROM animali ORDER BY nome');

// Restituisce un singolo libro per id
const findById = (id) =>
  pool.query('SELECT * FROM animali WHERE id = $1', [id]);


const findByProprietarioId = (proprietario_id) =>
  pool.query('SELECT * FROM animali WHERE proprietario_id = $1', [proprietario_id]);

// ── Query di scrittura ────────────────────────────────────────

// Inserisce un nuovo animale.
// RETURNING * restituisce la riga appena inserita (utile al controller).
const create = ({ nome, tipo, proprietario_id,note }) =>
  pool.query(
    `INSERT INTO animali (nome, tipo, proprietario_id,note)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, tipo, proprietario_id,note]
  );

// Aggiorna i metadati di un animale.
// COALESCE($1, titolo) significa: usa $1 se non è null, altrimenti tieni il valore attuale.
// Questo permette aggiornamenti parziali (PATCH): si manda solo ciò che cambia.
const update = (id, { nome, tipo, note }) =>
  pool.query(
    `UPDATE animali
     SET nome             = COALESCE($1, nome),
         tipo             = COALESCE($2, tipo),
         note            = COALESCE($3, note)
     WHERE id = $4
     RETURNING *`,
    [nome, tipo, note, id]
  );

// ── Gestione disponibilità ────────────────────────────────────


// Elimina un animale per id
const remove = (id) =>
  pool.query('DELETE FROM animali WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByProprietarioId,
  create, update, remove,
};
