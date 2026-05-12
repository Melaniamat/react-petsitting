// ============================================================
// components/ProtectedRoute.jsx — Protezione delle rotte private
// ============================================================
// Questo componente "avvolge" le pagine che richiedono il login.
//
// Come funziona:
//   - Se l'utente è autenticato → mostra la pagina (children)
//   - Altrimenti              → reindirizza a /login
//
// Viene usato in App.jsx così:
//   <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
// ============================================================

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { utente } = useAuth()
  const location = useLocation()

  if (!utente) {
    // "replace" evita che /login finisca nella cronologia del browser
    // "state" salva la pagina originale per poterla raggiungere dopo il login
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}