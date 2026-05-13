import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Layout() {

  const { utente, logout } = useAuth()

  return (
    <>
      <div className="layout">
        <header className="layout-header">
          <span className="logo">📝 TODO APP</span>
          <nav>
            <NavLink to="/" className={({isActive}) => isActive ? 'attivo' : ''}>Home</NavLink>
          </nav>

          <div className="layout-user">
            {utente && <span className="user-email">{utente.email}</span>}
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </header>

        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
