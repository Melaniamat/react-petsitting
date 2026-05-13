// ============================================================
// App.jsx — Componente principale dell'applicazione
// ============================================================
// Questo è il "cervello" dell'app: contiene lo stato globale
// (le task e il filtro attivo) e tutte le funzioni che lo
// modificano. Le passa poi ai componenti figli tramite le props.
//
// Rispetto alla lezione 1, qui le task NON sono più salvate
// solo in memoria: ogni azione (aggiungi, toggle, elimina)
// chiama il backend, che le persiste nel database PostgreSQL.
// ============================================================
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import Page from './pages/Page';
import Layout from './components/Layout';

import './App.css';


// ── Componente App ───────────────────────────────────────────
function App() {

  return (
    <>
      {/* <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>

      <Route path='/' element={<ProtectedRoute> <Layout/> </ProtectedRoute>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>  */}
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/' element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route index element={<Page/>}/>
          

        </Route>
        <Route path='*' element={<NotFound />} />


      </Routes>
    </>

  )
}

export default App;

