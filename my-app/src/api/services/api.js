// ============================================================
// services/api.js — Livello di accesso alle API del backend
// ============================================================
// L'URL base viene letto dal file .env tramite import.meta.env.
// In Vite, le variabili d'ambiente accessibili al browser
// devono avere il prefisso VITE_.
//
// Se la variabile non è definita, usiamo un fallback di sviluppo
// così l'app non crasha completamente con un messaggio criptico.
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Avviso in console se la variabile manca (solo in sviluppo)
if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '[api.js] VITE_API_URL non definita nel file .env.\n' +
    'Usando il fallback: http://localhost:3000/api\n' +
    'Copia .env.example in .env per risolvere.'
  )
}

function getToken() {
  return localStorage.getItem('token')
}

 export async function request(method, path, body = null) {
  const token = getToken()

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }

  if (body) options.body = JSON.stringify(body)

  // Gestiamo esplicitamente gli errori di rete (backend spento, no internet)
  // separandoli dagli errori HTTP (4xx, 5xx)
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, options)
  } catch {
    // fetch lancia solo per errori di rete, mai per 4xx/5xx
    throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.')
  }

  const data = await res.json()

  // 401 = token scaduto o revocato durante la sessione → logout automatico
  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!data.successo) {
    const err = new Error(data.errore || 'Errore sconosciuto')
    err.status = res.status
    throw err
  }

  return data.dati
}

export async function register(email, password){
    const res = await fetch(`${BASE_URL}/sitters/registra`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    }) 
    if(!res.ok){
        const data = await res.json()
        throw new Error(data.errore || 'Errore registrazione')
    }
    return res.json()
}


export async function login(email, password){
     const res = await fetch(`${BASE_URL}/sitters/login`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    }) 
    if(!res.ok){
        const data = await res.json()
        throw new Error(data.errore || 'Errore login')
    }
    return res.json()
}

/* // ── Libri ─────────────────────────────────────────────────────
export const libriAPI = {
  getAll:   ()         => request('GET',    '/libri'),
  getById:  (id)       => request('GET',    `/libri/${id}`),
  crea:     (dati)     => request('POST',   '/libri', dati),
  aggiorna: (id, dati) => request('PATCH',  `/libri/${id}`, dati),
  elimina:  (id)       => request('DELETE', `/libri/${id}`),
}

// ── Prestiti ──────────────────────────────────────────────────
export const prestitiAPI = {
  getAll: () => request('GET', '/prestiti'),

  crea: (libro_id, data_restituzione_prevista) =>
    request('POST', '/prestiti', { libro_id, data_restituzione_prevista }),

  restituisci: (id) => request('PATCH', `/prestiti/${id}/restituisci`),
  elimina:     (id) => request('DELETE', `/prestiti/${id}`),
}
// ── Import massivo libri (CSV) ────────────────────────────────
export const importAPI = {
  importaCSV: async (file) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', file) 

    let res
    try {
      res = await fetch(`${BASE_URL}/import/libriCSV`, {
        method: 'POST',
        headers: {
          // NON impostiamo Content-Type: il browser lo imposta automaticamente
          // con il boundary multipart corretto quando il body è FormData
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })
    } catch {
      throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.')
    }

    const data = await res.json()

    if (res.status === 401) window.dispatchEvent(new Event('auth:unauthorized'))

    // Nota: il backend risponde sempre successo:true per l'import (anche con errori parziali).
    // Gli errori parziali sono in data.dati.errori e data.dati.saltato.
    if (!data.successo) {
      const err = new Error(data.errore || 'Errore durante l\'import')
      err.status = res.status
      throw err
    }

    return data.dati
  }
} */