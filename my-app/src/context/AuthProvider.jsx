import { useState, useEffect, useContext} from 'react'
import { AuthContext } from './AuthContext';
import { login as sittersLogin,register as sittersRegisters } from '../api/services/api'


// ── Provider ──────────────────────────────────────────────────
// Avvolge l'intera app e rende disponibile il context a tutti i figli
export function AuthProvider({ children }) {

  const [utente, setUtente] = useState(null)


  // Controlla se il token è scaduto all'avvio
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if(!token) return
    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Ascolta l'evento 'auth:unauthorized' emesso da api.js quando
  // il server risponde 401 (token scaduto/revocato durante la sessione)
  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Chiamata dopo un login riuscito: salva il token e legge il payload
  async function login (email,password){
    const data= await sittersLogin(email,password);
    localStorage.setItem("token",data.token);
    setUtente(data.utente);
    return data;
  }
  async function register(){}
  function logout(){
    localStorage.removeItem("token");
    setUtente(null);
  }

  return (
    <AuthContext.Provider value={{ token, utente, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook personalizzato ───────────────────────────────────────
// Invece di scrivere useContext(AuthContext) ovunque,
// usiamo questo hook che ha un nome più leggibile.
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider')
  }
  return context
}