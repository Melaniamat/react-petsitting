import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext';
import { login as apiLogin, register as apiRegister } from '../api/services/auth'

export function AuthProvider({ children }) {

  const [utente, setUtente] = useState(null)
  const [loading, setLoading] = useState(() => !!sessionStorage.getItem('token'))

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) return;

    fetch('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Token non valido')
        return res.json()
      })
      .then(data => {
        setUtente(data.user)
        setLoading(false)
      })
      .catch(() => {
        sessionStorage.removeItem('token')
        setUtente(null)
        setLoading(false)
      })
  }, [])

  async function login(email, password) {
    const data = await apiLogin(email, password)
    sessionStorage.setItem('token', data.dati.token)
    setUtente(data.dati.utente)
    return data
  }

  async function register(nome, cognome, email, password) {
    return await apiRegister(nome, cognome, email, password)
  }

  function logout() {
    sessionStorage.removeItem('token')
    setUtente(null)
  }

  const value = { utente, login, logout, register, loading }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}