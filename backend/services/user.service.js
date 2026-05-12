require('dotenv').config();
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken');
const userModel = require('../models/users');


const getAll = async () => {
  const result = await userModel.findAll();
  return result.rows;
};


const getById = async (id) => {
  const result = await userModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Utente non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const getByEmail = async(email) => {
    const result = await userModel.findByEmail(email);
    if(!result.rows.length){
        const err = new Error('Utente non trovato');
        err.statusCode = 404;
        throw err;
    }
    return result.rows[0];
}

const aggiorna = async (id, dati) => {
  await getById(id);
  const result = await userModel.update(id, dati);
  return result.rows[0];
};

const aggiornaStato = async (id, dati) => {
  await getById(id);
  const result = await userModel.updateStato(id);
  return result.rows[0];
};

const getAppuntamenti = async (id) => {
  const result = await userModel.getAppuntamenti(id);
  return result.rows;
}

const getAnimali = async (id) => {
  const result = await userModel.getAnimaliAssegnati(id);
  return result.rows;
};


const elimina = async (id) => {
  await userModel.remove(id);
  return { message: 'Utente eliminato' };
};


module.exports = { getAll, getById , getByEmail, aggiorna, aggiornaStato, getAppuntamenti, getAnimali, elimina };
