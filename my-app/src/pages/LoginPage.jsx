import { useState } from 'react';
import { useAuth} from '../context/AuthProvider'
import { useNavigate, Link} from 'react-router-dom'

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errore, setErrore] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // customHook 

    async function handleSubmit(e){
        e.preventDefault();
        setErrore('')
        try{
            await login(email, password);
            navigate('/')
        } catch(err){
             console.log(err);
            setErrore(err.message)
        }
    }
    
    return(
        <>
        <div className='auth-container'>
            <div className='auth-card'>
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email'value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    {errore && <p className='errore'>{errore}</p>}
                    <button type='submit'>Accedi</button>
                </form>
                <p className='auth-link'>Non hai un account? <Link to='/register'>Registrati</Link></p>
            </div>
        </div>
        </>
    )
}


export default LoginPage;