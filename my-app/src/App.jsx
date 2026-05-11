import { useState, useEffect } from 'react';
import ListaSitter from './components/ListaSitter';
import './App.css'

import { deleteTodo, getSitters } from './api/sitters';


function App() {
  const [sitters, setSitters] = useState([]);
  const [errore, setErrore] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    getSitters()
      .then(data => {
  setSitters(data.dati)
  setLoading(false)
})
.catch(err=>{setErrore(err.message)
  setLoading(false)
  
})
  }, []);
console.log(sitters);
  // Elimina una task dal DB, poi la rimuove dall'array locale.
  async function eliminaTask(id) {
    await deleteTodo(id);
    setSitters(prev => prev.filter(s => s.id !== id));
  }

  if (loading) return <p>Caricamento in corso...</p>;
  if (errore) return <p>Errore: {errore}</p>;

  return (
    <>
      <h1>Lista Sitters</h1>
      <ListaSitter
      
      sitters={sitters}
      onElimina={eliminaTask}/>
    </>
  );
}

export default App
