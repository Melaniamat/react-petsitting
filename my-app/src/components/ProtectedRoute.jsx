import { Navigate } from 'react-router-dom';
import { useAuth} from '../context/useAuth'

function ProtectedRoute({ children }){
    const { utente, loading } = useAuth()

    if(loading){
        return <div>Caricamento ... </div>
    }
    if(!utente){
        return <Navigate to='/login' replace />
    }

    return children;
}


export default ProtectedRoute;
