// src/components/Layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="header flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="header-logo text-xl font-bold">
          <Link to="/" className="header-logo-text">
            EVENTOME
          </Link>
        </div>

        {/* Nawigacja */}
        <nav className="header-buttons flex gap-2">
          {isAuthenticated && (
            <Button
              onClick={() => navigate("/add-event")}
              className="bg-green-600 text-white"
            >
              Dodaj wydarzenie
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Button
                onClick={() => navigate("/profile")}
                className="bg-white text-blue-600"
              >
                Mój profil
              </Button>
              <Button onClick={logout} className="bg-red-500 text-white">
                Wyloguj
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600"
              >
                Logowanie
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-green-500 text-white"
              >
                Rejestracja
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
