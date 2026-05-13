// URL base del backend. Tutte le funzioni lo usano come prefisso.

import { request } from './api'; // Importi il motore

export const sitterApi = {
    getSitters: () => request('GET', '/sitters'),
    getById: (id) => request('GET', `/sitters/${id}`),
    deleteSitter:(id)=> request('DELETE',`/sitters${id}`)
    

    
};



