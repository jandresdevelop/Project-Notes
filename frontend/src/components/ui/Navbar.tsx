import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">📝 Project Notes</span>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Notas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/categories" className="nav-link">
                Categorías
              </NavLink>
            </li>
          </ul>

          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
