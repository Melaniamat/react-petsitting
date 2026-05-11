// ============================================================
// controller/utente.controller.js
// ============================================================

const proprietariService = require('../services/proprietari.service');

// POST /registra
const registra = async (req, res, next) => {
  try {
    const utente = await proprietariService.registra(req.body);
    res.status(201).json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const token = await proprietariService.login(req.body);
    res.json({ successo: true, dati: token });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const animali = await proprietariService.getAll();
    res.json({ successo: true, dati: animali });
  } catch (err) { next(err); }
};



const getAnimaliAssegnati = async (req, res, next) => {
  try {
    const proprietarioId = req.utente.id;
    const animali = await proprietariService.getAnimaliAssegnati(proprietarioId);
    res.json({ successo: true, dati: animali });
  } catch (err) { next(err); }
};



// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await proprietariService.getById(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await proprietariService.aggiorna(id, req.body);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};


// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const risultato = await proprietariService.elimina(id);
    res.json({ successo: true, dati: risultato });
  } catch (err) { next(err); }
};

module.exports = { registra, login, getAll,getAnimaliAssegnati, getById, aggiorna,  elimina };
