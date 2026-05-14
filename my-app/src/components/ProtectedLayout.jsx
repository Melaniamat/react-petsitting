import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Navbar from "./Navbar";
import Hero from "./Hero";



function ProtectedLayout() {

  const { utente, logout } = useAuth()

  return (
    <>
      <div className="layout">
        <header className="layout-header">
          <Navbar/>
         
        </header>

        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default ProtectedLayout;
