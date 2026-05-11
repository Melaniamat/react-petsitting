// ============================================================
// controller/prestiti.controller.js
// ============================================================

const appuntamentiService = require('../services/appuntamenti.service');

// POST /
const crea = async (req, res, next) => {
  try {
    // FIX #4 — utente_id viene letto da req.utente.id (il JWT verificato),
    // NON dal body della richiesta. In questo modo un utente non può
    // creare un prestito intestato a un altro utente.
    const utente_id = req.utente.id;
    const prestito = await appuntamentiService.crea(req.body, utente_id);
    res.status(201).json({ successo: true, dati: prestito });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => { 
  try {

    const prestiti = await appuntamentiService.getAll();
    res.json({ successo: true, dati: prestiti });
  } catch (err) { next(err); }
};

const getAllByStato = async (req, res, next) => {
  try {

    const prestiti = await appuntamentiService.getAllByStato(req.stato);
    res.json({ successo: true, dati: prestiti });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    const prestito = await appuntamentiService.getById(id);
    res.json({ successo: true, dati: prestito });
  } catch (err) { next(err); }
};



// PATCH /:id/restituisci
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    const prestito = await appuntamentiService.aggiorna(id);
    res.json({ successo: true, dati: prestito });
  } catch (err) { next(err); }
};

const annulla = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    const prestito = await appuntamentiService.annulla(id);
    res.json({ successo: true, dati: prestito });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    await appuntamentiService.elimina(id);
    res.json({ successo: true });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById,getAllByStato, crea, elimina, aggiorna, annulla };
