// ============================================================
// ListaSitter.jsx — Contenitore della lista di sitter
// ============================================================
// Questo componente riceve l'array di sitter (già filtrato da
// App.jsx) e le visualizza una per una usando TodoItem.
// Non sa come filtrare né come modificare le sitter: delega
// tutto ai componenti genitore e figlio.
// ============================================================

// Importiamo TodoItem: è il componente che rappresenta
// una singola riga della lista
import SitterItem from "./SitterItem";

// Props ricevute da App.jsx:
//   sitters     → array di oggetti sitter da visualizzare
//   onToggle  → funzione per completare/decompletare una sitter
//   onElimina → funzione per eliminare una sitter

function ListaSitter({ sitters, onElimina }) {


  if (!sitters) {
    return <p className="caricamento">Caricamento sitter in corso...</p>;
  }
  // Caso speciale: se non ci sono sitter da mostrare
  // (array vuoto), mostriamo un messaggio invece della lista.
  // Questo può succedere quando il filtro non ha risultati
  // o quando tutte le sitter sono state eliminate.
  if (sitters.length === 0) {
    return <p className="lista-vuota">Nessun sitter da mostrare</p>;
  }

  return (
    // <ul> è la lista non ordinata che contiene gli elementi.
    // Lo stile `todo-lista` in App.css la trasforma
    // in una colonna con spazio tra i vari item.
    <ul className="sitter-lista">
      {/* Per ogni sitter nell'array creiamo un componente TodoItem.
          key={sitter.id} → React lo usa internamente per sapere
          quale elemento è cambiato quando la lista si aggiorna.
          Deve essere univoco tra i fratelli. */}
      {sitters.map((sitter) => (
        <SitterItem
          key={sitter.id}
          sitter={sitter}           // Passiamo l'intero oggetto sitter
          onElimina={onElimina} // Callback per eliminazione
        />
      ))}
    </ul>
  );
}

export default ListaSitter;
