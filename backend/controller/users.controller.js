// ============================================================
// controller/utente.controller.js
// ============================================================

const userService = require('../services/user.service');




// GET /
const getAll = async (req, res, next) => {
  try {
    const utenti = await userService.getAll();
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};

const getAppuntamenti = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utenti = await userService.getAppuntamenti(id);
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};

const getAnimali = async (req, res, next) => {
  
  try {
    const id = parseInt(req.params.id);
    const utenti = await userService.getAnimali(id);
    res.json({ successo: true, dati: utenti });
  } catch (err) { next(err); }
};



// GET /:id
const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await userService.getById(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

const getByEmail = async (req, res, next) => {
  try {
    const email= req.params.email;
    const utente = await userService.getById(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiorna = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await userService.aggiorna(id, req.body);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// PATCH /:id
const aggiornaStato = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const sitter = await userService.aggiornaStato(id);
    res.json({ successo: true, dati: utente });
  } catch (err) { next(err); }
};

// DELETE /:id
const elimina = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const risultato = await userService.elimina(id);
    res.json({ successo: true, dati: risultato });
  } catch (err) { next(err); }
};

module.exports = { getAll,getAnimali,getAppuntamenti, getById,getByEmail, aggiorna, aggiornaStato, elimina };
