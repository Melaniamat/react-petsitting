// ============================================================
// services/libri.service.js — Logica di business per i libri
//
// Il service sa COSA fare (regole, controlli, orchestrazione).
// Delega al model il COME farlo sul database.
// Questa separazione si chiama "separation of concerns":
//   model  → dati
//   service → regole di business
//   controller → parsing HTTP (req/res)
// ============================================================

const appuntamentiModel = require('../models/appuntamenti');
const sitterModel = require('../models/sitters');
const animaleModel = require('../models/animali');

// Crea un nuovo appuntamento dopo aver verificato che l'ISBN non sia già presente.
const crea = async (dati) => {

  const animale= await animaleModel.findById(dati.animale_id);
  const sitter= await sitterModel.findById(dati.sitter_id);


  if (!animale.rows.length || !sitter.rows.length ) {
    const err = new Error('animale  o sitter non trovato');
    err.statusCode = 404;
    throw err;
  }

  if(!sitter.stato ==='abilitato'){

    const err = new Error('sitter non abilitato');
    err.statusCode = 403;
    throw err;

  }
  
  const appuntamento = await appuntamentiModel.create(dati);
  return appuntamento.rows[0];
};

// Restituisce tutti gli appuntamenti
const getAll = async () => {
  await appuntamentiModel.aggiornaStato;
  const result = await appuntamentiModel.findAll();
  return result.rows;
};

const getFiltrati = async (stato) => {
  await appuntamentiModel.aggiornaStato
  const result = await appuntamentiModel.findAllByStato();
  return result.rows;
};



// Restituisce un singolo appuntamento per id.
// Lancia un 404 se non esiste — così controller e altri service
// possono fare semplicemente "await getById(id)" senza gestire i null.
const getById = async (id) => {
  
  const result = await appuntamentiModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Appuntamento non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

// Aggiorna i campi del appuntamento (PATCH parziale grazie a COALESCE nel model)
const aggiorna = async (id, dati) => {

  await getById(id); // verifica esistenza prima di aggiornare
  const result = await appuntamentiModel.update(id, dati);
  return result.rows[0];
};

const annulla= async(id) => {

  await getById(id); // verifica esistenza prima di aggiornare
  const result = await appuntamentiModel.annulla(id);
  return result.rows[0];
}

// Elimina un appuntamento dal catalogo
const elimina = async (id) => {
  await getById(id); // verifica esistenza prima di eliminare
  await appuntamentiModel.remove(id);
  return { message: 'appuntamento eliminato' };
};



// ── Esportazione ──────────────────────────────────────────────
module.exports = { getAll, getById, crea, annulla , aggiorna, elimina};
