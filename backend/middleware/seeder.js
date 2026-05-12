const userModel = require('../models/users');
const brcrypt = require('bcrypt');

const SALT_ROUND = 12;

const seedAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const nome = process.env.ADMIN_NOME || 'Admin';
    const cognome = process.env.ADMIN_COGNOME || 'Sistema';

    if(process.env.NODE_ENV != 'development'){
        console.warn('Backend in produzione, seeder non avviato');
        return;
    }

    if(!email || !password ){
        console.warn ('Seeder admin saltato, ADMIN_EMAIL o ADMIN_PASSWORD mancanti in .env')
        return;
    }

    const verificaUtente = await userModel.findByEmail(email);
    if (verificaUtente.rows.length) {
        console.log('Admin giá presente.');
        return;
    }

    const hash = await brcrypt.hash(password, SALT_ROUND);

    await userModel.create({
        nome, cognome, email, password:hash, ruolo: 'admin'
    })

    console.log('Admin é stato creato.')
}

module.exports = seedAdmin;