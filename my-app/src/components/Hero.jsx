import { Link } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import { useAuth } from "../context/useAuth";

function Hero() {
    const { utente, logout } = useAuth()
    return (
        <div className="px-4 pt-5 my-5 text-center border-bottom">
            <h1 className="display-4 fw-bold text-body-emphasis">Affidaci i tuoi pet</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Servizio di qualità garantito, petSitter esperti e amorevoli, come se non fossi mai andato in vacanza.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <Link className="btn btn-primary btn-lg px-4 me-sm-3" to="/about">Scopri di più</Link>
                    {!utente && <Link className="btn btn-outline-secondary btn-lg px-4" to="/register">Registrati</Link>}
                    
                </div>
            </div>
            <div className="overflow-hidden" >
                <div className="container px-5">
                    <img src="https://place.dog/300/200" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image"  loading="lazy" />
                </div>
            </div>
        </div>
    )

}
export default Hero;