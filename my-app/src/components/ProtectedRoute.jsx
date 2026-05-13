import { Navigate } from 'react-router-dom';
import { useAuth} from '../context/AuthProvider'

function ProtectedRoute({ children }){
    const { utente, loading } = useAuth()

    if(loading){
        return <div>Caricamento ... </div>
    }

    console.log(!!utente)

    if(!utente){
        return <Navigate to='/login' replace />
    }

    return children;
}


export default ProtectedRoute;
