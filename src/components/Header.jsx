import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/students" className="navbar-brand">
            Student Management System
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/students">
                  Students
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teachers">Teachers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/classes">
                  Classes{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/school">
                  School
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
