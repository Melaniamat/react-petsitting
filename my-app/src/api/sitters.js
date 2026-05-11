// URL base del backend. Tutte le funzioni lo usano come prefisso.
const BASE = 'http://localhost:3000';


// ── GET /todos ───────────────────────────────────────────────
// Recupera tutte le task dal database.
// Restituisce una Promise che si risolve con l'array di task.
export async function getSitters() {
    // fetch() fa una richiesta HTTP GET (metodo di default)
    const res = await fetch(`${BASE}/api/sitter/`);

    // res.ok è true se lo status HTTP è tra 200 e 299.
    // Se il server risponde con 500 o 404, lanciamo un errore
    // che verrà catturato dal .catch() in App.jsx.
    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);

    // res.json() legge il corpo della risposta e lo converte
    // da stringa JSON a oggetto/array JavaScript
    return res.json();
}

export async function deleteTodo(id) {
    const res = await fetch(`${BASE}/api/sitter/${id}`, { method: 'DELETE' });

    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);

    // Nessun return: DELETE restituisce 204 No Content,
    // quindi non c'è un corpo JSON da leggere
}
