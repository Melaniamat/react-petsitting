// ============================================================
// controller/utente.controller.js
// ============================================================

const sitterService = require('../services/sitters.service');

// POST /registra
const registra = async (req, res, next) => {
  try {
    const utente = await sitterService.registra(req.body);
    res.status(201).json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const token = await sitterService.login(req.body);
    res.json({ successo: true, dati: token });
  } catch (err) { next(err); }
};

// GET /
const getAll = async (req, res, next) => {
  try {
    const utenti = await sitterService.getAll();
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};

const getAppuntamenti = async (req, res, next) => {
  try {
    const utenti = await sitterService.getAppuntamenti();
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};

const getAnimaliAssegnati = async (req, res, next) => {
  try {
    const utenti = await sitterService.getAnimaliAssegnati();
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};



// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await sitterService.getById(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await sitterService.aggiorna(id, req.body);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiornaStato = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const sitter = await sitterService.aggiornaStato(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const risultato = await sitterService.elimina(id);
    res.json({ successo: true, dati: risultato });
  } catch (err) { next(err); }
};

module.exports = { registra, login, getAll,getAnimaliAssegnati,getAppuntamenti, getById, aggiorna, aggiornaStato, elimina };
