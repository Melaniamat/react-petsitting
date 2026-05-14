const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'


export async function register(nome,cognome,email, password,ruolo){
    const res = await fetch(`${BASE_URL}/auth/registra`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nome, cognome,email, password, ruolo})
    }) 
    if(!res.ok){
        const data = await res.json()
        throw new Error(data.errore || 'Errore registrazione:')
    }
    return res.json()
}


export async function login(email, password){
     const res = await fetch(`${BASE_URL}/auth/login`, {
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

