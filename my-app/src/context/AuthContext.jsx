// ============================================================
// context/AuthContext.jsx — Stato globale dell'autenticazione
// ============================================================
// React Context ci permette di condividere lo stato dell'utente
// loggato con tutti i componenti dell'app senza passare props
// manualmente ad ogni livello (prop drilling).
//
// Espone:
//   utente  — il payload del JWT ({ id, email, ruolo, ... }) o null
//   token   — la stringa JWT grezza (per le richieste HTTP)
//   login   — salva il token e aggiorna lo stato
//   logout  — rimuove il token e resetta lo stato
// ============================================================

import { createContext} from 'react'

// Creiamo il context con valore di default null
 export const AuthContext = createContext();


