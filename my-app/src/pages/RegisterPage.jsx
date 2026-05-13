import { useState } from 'react';
import { register} from '../api/services/auth'
import { useNavigate, Link} from 'react-router-dom'

function RegisterPage(){
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errore, setErrore] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        setErrore('')
        try{
            await register(nome, cognome,email, password)
            setSuccess(true)
            setTimeout( () => navigate('/login', 1500))
        } catch(err){
            setErrore(err.message)
        }
    }
    
    if(success){
        return (
            <>
            <div>
                <div>
                    <h1>Registrazione completata</h1>
                    <p>Reindirizzamento al login...</p>
                </div>
            </div>
            </>
        )
    }

    return(
        <>
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>REGISTRA</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form-control"type="text" placeholder='Nome'value={nome}onChange={e => setNome(e.target.value)} required/>
                    <input className="form-control"type="text" placeholder='Cognome'value={cognome} onChange={e => setCognome(e.target.value)} required/>
                    <input className="form-control"type="email" placeholder='Email'value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input  className="form-control"type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    {errore && <p className='errore'>{errore}</p>}
                    <button type='submit'>Registrati</button>
                </form>
                <p className='auth-link'>Hai giá un account? <Link to='/login'>Accedi</Link></p>
            </div>
        </div>
        </>
    )
}


export default RegisterPage;