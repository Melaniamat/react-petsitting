import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Layout() {

  const { user, logout } = useAuth()

  return (
    <>
      <div className="layout">
        <header className="layout-header">
          <span className="logo">📝 TODO APP</span>
          <nav>
            <NavLink to="/" className={({isActive}) => isActive ? 'attivo' : ''}>Home</NavLink>
            <NavLink to="/stats" className={({isActive}) => isActive ? 'attivo' : ''}>Login</NavLink>
          </nav>

          <div className="layout-user">
            {user && <span className="user-email">{user.email}</span>}
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
