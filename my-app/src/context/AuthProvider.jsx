import { useState, useEffect, useContext} from 'react'
import { AuthContext } from './AuthContext';
import { login as apiLogin, register as apiRegister } from '../api/services/auth'


// ── Provider ──────────────────────────────────────────────────
// Avvolge l'intera app e rende disponibile il context a tutti i figli
export function AuthProvider({ children }) {

  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState( true);


  // Controlla se il token è scaduto all'avvio
  useEffect(() => {
    console.log('richiesta token' )
    const token = localStorage.getItem("token");
  

    if(!token||token=='undefined') {

      setLoading(false);
      return;

    }
      

    fetch('http://localhost:3000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
            
        })
        .then(res => {
          
            if (!res.ok) throw new Error('Token non valido');
            return res.json();
        })
        .then(data => {
            setUtente(data.user);
            console.log("Questisono i dati:"+data)
            setLoading(false);
        })
        .catch(() => {
            localStorage.removeItem('token');
            setUtente(null);
            setLoading(false);
        });
    
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
    const data= await apiLogin(email,password);
    localStorage.setItem("token",data.dati);
    const utenteRecuperato = data.utente || data.user;
    setUtente(utenteRecuperato);
    return data;
  }

  async function register(email, password) {
        return await apiRegister(email, password);
  }

  function logout(){
    localStorage.removeItem("token");
    setUtente(null);
  }

const value = { utente, login, logout, register, loading };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook personalizzato ───────────────────────────────────────
// Invece di scrivere useContext(AuthContext) ovunque,
// usiamo questo hook che ha un nome più leggibile.
export function useAuth() {
  const context = useContext(AuthContext)
  console.log(context)
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider')
  }
  return context
}