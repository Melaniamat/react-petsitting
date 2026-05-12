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
import { useAuth } from '../context/AuthProvider'

export default function ProtectedRoute({ children }) {
  const { utente } = useAuth()

  if (!utente) {
    
    return <Navigate to="/login" replace  />
  }
  return children
}