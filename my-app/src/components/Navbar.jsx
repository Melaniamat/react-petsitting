import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
    const { utente, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">&#128062; <strong>PetCare</strong> </NavLink>
                
                            
                             {utente && <span >Benvenuto, {utente.nome} {utente.cognome} <button className="btn btn-secondary w-1" onClick={logout}> Logout </button></span>}
                            
                        

                {/* Bottone per il mobile (Hamburger) - Notare data-bs-toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>

                        {utente ? (
                            <>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Menu {utente?.ruolo}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/profilo">Profilo</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/settings">Impostazioni</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item" onClick={logout}>Esci</button>
                                </li>
                            </ul>
                        </li>
                        
                        </> ):(
                         <>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                         <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Registrati</NavLink>
                        </li>
                        </>
                         )}

                    </ul>
                       
                </div>
            </div>
        </nav>
    );
}

export default Navbar;