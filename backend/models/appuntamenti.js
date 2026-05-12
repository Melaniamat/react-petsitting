const pool = require('../config/db');

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS appuntamenti (
    id                          SERIAL      PRIMARY KEY,
    animale_id                   INTEGER     NOT NULL REFERENCES animali(id) ON DELETE CASCADE,
    sitter_id                    INTEGER     NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    data_appuntamento            DATE        NOT NULL DEFAULT CURRENT_DATE,
    stato                       VARCHAR(20) NOT NULL DEFAULT 'pending'
                                CHECK (stato IN ('pending', 'attivo', 'annullato', 'completato')),
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const init = () => pool.query(CREATE_TABLE);

// Restituisce tutti i prestiti con i dettagli dell'utente e del libro collegati.
// JOIN ci permette di unire più tabelle in una sola risposta,
// così il frontend riceve tutto il necessario in una query sola.
const findAll = () =>
  pool.query(
    `SELECT
       app.*,
       an.nome AS nome_animale,
       an.tipo AS tipo_animale,
       p.nome || ' ' || p.cognome AS proprietario_nome,
       p.email AS proprietario_email,
       s.nome || ' ' || s.cognome AS sitter_nome,
       s.email AS sitter_email,
     FROM appuntamenti app
     JOIN animali an ON an.id = app.animale_id
     JOIN users p ON p.id = an.proprietario_id
     JOIN users s ON s.id = app.sitter_id
     ORDER BY app.data_appuntamento DESC`
  );
const findAllByStato = (stato) =>
  pool.query(
    `SELECT
       app.*,
       an.nome AS nome_animale,
       an.tipo As tipo_animale,
       p.nome || ' ' || p.cognome AS proprietario_nome,
       p.email AS proprietario_email,
       s.nome || ' ' || s.cognome AS sitter_nome,
       s.email AS sitter_email,
     FROM appuntamenti app
     JOIN animali an ON an.id = app.animale_id
     JOIN users p ON p.d = an.proprietario_id
     JOIN users s ON s.id = a.sitter_id
     WHERE app.stato = $1;
     ORDER BY app.data_appuntamento DESC`,
     [stato]);
// Restituisce un singolo appuntamento con i dettagli di proprietario e libro
const findById = (id) =>
  pool.query(
    `SELECT
       app.*,
       an.nome AS nome_animale,
       an.tipo As tipo_animale,
       p.nome || ' ' || p.cognome AS proprietario_nome,
       p.email AS proprietario_email,
       s.nome || ' ' || s.cognome AS sitter_nome,
       s.email AS sitter_email,
     FROM appuntamenti app
     JOIN animali an ON an.id = app.animale_id
     JOIN users p ON p.id = an.proprietario_id
     JOIN users s ON s.id app.sitter_id
     WHERE app.id = $1`,
    [id]
  );

// Inserisce un nuovo appuntamento
const create = ({ animale_id, sitter_id, data_appuntamento }) =>
  pool.query(
    `INSERT INTO appuntamenti (animale_id, sitter_id, data_appuntamento)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [animale_id, sitter_id, data_appuntamento]
  );

// annulla l'appuntamento(admin)
const annulla = (id) =>
  pool.query(`
    UPDATE appuntamenti
    SET stato = 'annullato'
    WHERE id = $1
    RETURNING *
    `,[id]
  );

// Aggiorna automaticamente lo stato a 'completato' per tutti gli appuntamenti
// che non sono stati annullati
// Viene chiamata ogni volta che si recupera la lista degli appuntamenti.
const aggiornaStato = () =>
  pool.query(
    `UPDATE appuntamenti
     SET stato = 'completato'
     WHERE stato = 'attivo'
       AND data_appuntamento < CURRENT_DATE`
  );

// Elimina un prestito per id
const remove = (id) =>
  pool.query('DELETE FROM appuntamenti WHERE id = $1 RETURNING id', [id]);

module.exports = { init, findAll, findById,findAllByStato, create, annulla, aggiornaStato, remove };