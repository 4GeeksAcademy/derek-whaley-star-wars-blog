import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 border-bottom border-warning">
      <div className="container-fluid">

        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png?20080824073021"
            alt="Star Wars Logo"
            style={{ height: "50px", marginRight: "15px" }}
          />
        </Link>

        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link text-warning mx-2" to="/">Characters</Link>
          <Link className="nav-link text-warning mx-2" to="/vehicles">Vehicles</Link>
          <Link className="nav-link text-warning mx-2" to="/planets">Planets</Link>
        </div>

        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="dropdownFavorites"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({store.favorites.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning">
              {store.favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item text-light">No favorites yet</span>
                </li>
              ) : (
                store.favorites.map((item, index) => (
                  <li key={index}>
                    <span className="dropdown-item text-warning">{item}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
