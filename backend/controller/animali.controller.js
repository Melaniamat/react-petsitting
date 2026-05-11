// ============================================================
// controller/animali.controller.js
// ============================================================

const animaliService = require('../services/animali.service');

// POST /
const crea = async (req, res, next) => {
  try {
    const proprietario_id = req.utente.id;
    const datiAnimale = { ...req.body, proprietario_id };
    const nuovoAnimale = await animaliService.crea(datiAnimale)
    res.status(201).json({ successo: true, dati: datiAnimale});
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const animali = await animaliService.getAll();
    res.json({ successo: true, dati: animali });
  } catch (err) { next(err); }
};

// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); 
    const animale = await animaliService.getById(id);
    res.json({ successo: true, dati: animale });
  } catch (err) { next(err); }
};


// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    const animale = await animaliService.aggiorna(id, req.body);
    res.json({ successo: true, dati: animale });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // 🔒 FIX #7
    const message= await animaliService.elimina(id);
    res.json({ successo: true, dati:message });
  } catch (err) { next(err); }
};

module.exports = { crea, getAll, getById, aggiorna, elimina };
