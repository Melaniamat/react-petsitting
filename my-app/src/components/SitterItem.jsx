// ============================================================
// TodoItem.jsx — Una singola riga della lista todo
// ============================================================
// È il componente più "piccolo" e specifico dell'app.
// Visualizza una task con:
//   • un'icona cliccabile che indica lo stato
//   • il testo della task (cliccabile per togglare)
//   • un pulsante per eliminarla
//
// Non ha stato proprio: tutto viene gestito tramite props.
// ============================================================

// Props ricevute da TodoList:
//   task      → l'oggetto { id, testo, completato }
//   onToggle  → funzione per invertire completato/incompleto
//   onElimina → funzione per rimuovere la task dalla lista
function TodoItem({ sitter, onElimina }) {
  return (
    // La classe CSS cambia dinamicamente:
    // - se task.completato è true  → 'todo-item completato'
    // - se task.completato è false → 'todo-item'
    // In App.css, la classe 'completato' aggiunge il testo barrato.
    <li >
      <span>
        {sitter.id}
      </span>

      {/* Testo della task. Anche questo è cliccabile per
          permettere all'utente di togglare con un'area più ampia. */}
      <span> <b>Sitter:</b> {sitter.nome}-{sitter.cognome}</span>
      {/* Pulsante per eliminare la task.
          onClick chiama onElimina con l'id: App.jsx filtrerà
          fuori questa task dall'array. */}
      <button className="elimina" onClick={() => onElimina(sitter.id)}>
        X
      </button>

    </li>
  );
}

export default TodoItem;
