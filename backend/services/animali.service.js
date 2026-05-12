const animaliModel  = require('../models/animali');
const userModel  = require('../models/users');



const crea = async ({ nome,tipo,note,proprietario_id}) => {
  
  const proprietario= await userModel.findById(proprietario_id);
  
  if (!proprietario.rows.length) {
    const err = new Error('proprietario non trovato');
    err.statusCode = 404;
    throw err;
  }

  const animale = await animaliModel.create({ nome,tipo,proprietario_id,note });
  return animale.rows[0];
};

// Restituisce tutti i prestiti aggiornando prima i ritardi
const getAll = async () => {
  const result = await animaliModel.findAll();
  return result.rows;
};

const getById = async (id) => {
  const result = await animaliModel.findById(id);
  if (!result.rows.length) {
    const err = new Error('Animale non trovato');
    err.statusCode = 404;
    throw err;
  }
  return result.rows[0];
};

const aggiorna = async (id, dati) => {
  await getById(id);
  const result = await animaliModel.update(id, dati);
  return result.rows[0];
};

const elimina = async (id) => {
  await getById(id);
  await animaliModel.remove(id);
  return { message: 'Animale eliminato...si scherza eh ' };
};

// ── Esportazione ──────────────────────────────────────────────
module.exports = { getAll, getById, crea, elimina, aggiorna};
